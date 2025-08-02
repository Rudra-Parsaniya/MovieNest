using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieAPIController : ControllerBase
    {
        private readonly MovieDbContext context;
        public MovieAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Movie>>> GetMovies()
        {
            var data = await context.Movies.ToListAsync();
            return Ok(data);
        }

        [HttpGet("{MovieID}")]
        public async Task<ActionResult<Movie>> GetMovieById(int MovieID)
        {
            var movie = await context.Movies.FindAsync(MovieID);
            if (movie == null)
            {
                return NotFound();
                 
            }
            return Ok(movie);
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(MovieCreateDto dto)
        {
            var mov = new Movie
            {
                MovieTitle = dto.MovieTitle,
                MovieGenre = dto.MovieGenre,
                ReleaseYear = dto.ReleaseYear,
                ImgUrl = dto.ImgUrl,
                Rating = dto.Rating,
                Description = dto.Description,
                Duration = dto.Duration
            };

            await context.Movies.AddAsync(mov);
            await context.SaveChangesAsync();

            return Ok(mov);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(int id)
        {
            var mov = await context.Movies.FindAsync(id);
            if (mov == null)
            {
                return NotFound();

            }
            context. Movies.Remove(mov);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{MovieID}")]
        public async Task<ActionResult<Movie>> UpdateMovie(int MovieID, MovieUpdateDto dto)
        {
            if (MovieID != dto.MovieId)
            {
                return BadRequest("Movie ID mismatch");
            }

            var movie = await context.Movies.FindAsync(MovieID);
            if (movie == null)
            {
                return NotFound("Movie not found");
            }

            // Update the movie properties
            movie.MovieTitle = dto.MovieTitle;
            movie.MovieGenre = dto.MovieGenre;
            movie.ReleaseYear = dto.ReleaseYear;
            movie.ImgUrl = dto.ImgUrl;
            movie.Rating = dto.Rating;
            movie.Description = dto.Description;
            movie.Duration = dto.Duration;

            context.Entry(movie).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(movie);
        }

        // GET: api/MovieAPI/search?title=avengers&genre=Action,Comedy&year=2020
        [HttpGet("search")]
        public async Task<ActionResult<List<Movie>>> SearchMovies(string? title, string? genre, int? year)
        {
            var query = context.Movies.AsQueryable();

            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(m => m.MovieTitle.Contains(title));

            if (!string.IsNullOrWhiteSpace(genre))
            {
                var genres = genre.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(g => g.Trim())
                    .Where(g => !string.IsNullOrWhiteSpace(g))
                    .ToList();
                
                if (genres.Any())
                {
                    query = query.Where(m => genres.Any(g => 
                        m.MovieGenre != null && m.MovieGenre.Contains(g)));
                }
            }

            if (year.HasValue)
                query = query.Where(m => m.ReleaseYear == year.Value);

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpGet("genres")]
        public async Task<ActionResult<List<string>>> GetGenres()
        {
            var allGenres = await context.Movies
                .Where(m => !string.IsNullOrEmpty(m.MovieGenre))
                .Select(m => m.MovieGenre)
                .ToListAsync();

            var individualGenres = allGenres
                .SelectMany(g => g?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? new string[0])
                .Select(g => g.Trim())
                .Where(g => !string.IsNullOrWhiteSpace(g))
                .Distinct()
                .OrderBy(g => g)
                .ToList();

            return Ok(individualGenres);
        }

        [HttpGet("years")]
        public async Task<ActionResult<List<int>>> GetReleaseYears()
        {
            var years = await context.Movies
                .Select(m => m.ReleaseYear)
                .Distinct()
                .OrderBy(y => y)
                .ToListAsync();
            return Ok(years);
        }


        private bool MovieExists(int id)
        {
            return context.Movies.Any(e => e.MovieId == id);
        }



    }
}
