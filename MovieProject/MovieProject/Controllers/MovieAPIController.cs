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
        public async Task<ActionResult<Movie>> UpdateMovie(int MovieID, Movie mov)
        {
            if (MovieID != mov.MovieId)
            {
                return BadRequest();

            }
            context.Entry(mov).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(mov);
        }

        // GET: api/MovieAPI/search?title=avengers
        [HttpGet("search")]
        public async Task<ActionResult<List<Movie>>> SearchMovies(string? title, string? genre, int? year)
        {
            var query = context.Movies.AsQueryable();

            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(m => m.MovieTitle.Contains(title));

            if (!string.IsNullOrWhiteSpace(genre))
                query = query.Where(m => m.MovieGenre == genre);

            if (year.HasValue)
                query = query.Where(m => m.ReleaseYear == year.Value);

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpGet("genres")]
        public async Task<ActionResult<List<string>>> GetGenres()
        {
            var genres = await context.Movies
                .Select(m => m.MovieGenre)
                .Distinct()
                .OrderBy(g => g)
                .ToListAsync();

            return Ok(genres);
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
