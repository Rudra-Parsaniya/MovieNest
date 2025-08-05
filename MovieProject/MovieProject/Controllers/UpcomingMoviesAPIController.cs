using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpcomingMoviesAPIController : ControllerBase
    {
        private readonly MovieDbContext context;
        public UpcomingMoviesAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UpcomingMovie>>> GetUpcomingMovies()
        {
            var data = await context.UpcomingMovies.ToListAsync();
            return Ok(data);
        }

        [HttpGet("{UpcomingId}")]
        public async Task<ActionResult<UpcomingMovie>> GetUpcomingMovieById(int UpcomingId)
        {
            var upcomingMovie = await context.UpcomingMovies.FindAsync(UpcomingId);
            if (upcomingMovie == null)
            {
                return NotFound();
            }
            return Ok(upcomingMovie);
        }

        [HttpPost]
        public async Task<ActionResult<UpcomingMovie>> CreateUpcomingMovie(UpcomingMovieCreateDto dto)
        {
            var upcomingMovie = new UpcomingMovie
            {
                MovieTitle = dto.MovieTitle,
                MovieGenre = dto.MovieGenre,
                ReleaseYear = dto.ReleaseYear,
                ImgUrl = dto.ImgUrl,
                Description = dto.Description,
                Duration = dto.Duration,
                ReleaseDate = dto.ReleaseDate,
                TrailerUrl = dto.TrailerUrl
            };

            await context.UpcomingMovies.AddAsync(upcomingMovie);
            await context.SaveChangesAsync();

            return Ok(upcomingMovie);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UpcomingMovie>> DeleteUpcomingMovie(int id)
        {
            var upcomingMovie = await context.UpcomingMovies.FindAsync(id);
            if (upcomingMovie == null)
            {
                return NotFound();
            }
            context.UpcomingMovies.Remove(upcomingMovie);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{UpcomingId}")]
        public async Task<ActionResult<UpcomingMovie>> UpdateUpcomingMovie(int UpcomingId, UpcomingMovieUpdateDto dto)
        {
            if (UpcomingId != dto.UpcomingId)
            {
                return BadRequest("Upcoming Movie ID mismatch");
            }

            var upcomingMovie = await context.UpcomingMovies.FindAsync(UpcomingId);
            if (upcomingMovie == null)
            {
                return NotFound("Upcoming Movie not found");
            }

            // Update the upcoming movie properties
            upcomingMovie.MovieTitle = dto.MovieTitle;
            upcomingMovie.MovieGenre = dto.MovieGenre;
            upcomingMovie.ReleaseYear = dto.ReleaseYear;
            upcomingMovie.ImgUrl = dto.ImgUrl;
            upcomingMovie.Description = dto.Description;
            upcomingMovie.Duration = dto.Duration;
            upcomingMovie.ReleaseDate = dto.ReleaseDate;
            upcomingMovie.TrailerUrl = dto.TrailerUrl;

            context.Entry(upcomingMovie).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(upcomingMovie);
        }

        // GET: api/UpcomingMoviesAPI/search?title=avengers&genre=Action&year=2024
        [HttpGet("search")]
        public async Task<ActionResult<List<UpcomingMovie>>> SearchUpcomingMovies(string? title, string? genre, int? year)
        {
            var query = context.UpcomingMovies.AsQueryable();

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
        public async Task<ActionResult<List<string>>> GetUpcomingMovieGenres()
        {
            var allGenres = await context.UpcomingMovies
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
        public async Task<ActionResult<List<int>>> GetUpcomingMovieReleaseYears()
        {
            var years = await context.UpcomingMovies
                .Select(m => m.ReleaseYear)
                .Where(y => y.HasValue)
                .Distinct()
                .OrderBy(y => y)
                .ToListAsync();
            return Ok(years);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<List<UpcomingMovie>>> GetUpcomingMoviesByDate()
        {
            var currentDate = DateTime.Now;
            var upcomingMovies = await context.UpcomingMovies
                .Where(m => m.ReleaseDate > currentDate)
                .OrderBy(m => m.ReleaseDate)
                .ToListAsync();
            return Ok(upcomingMovies);
        }

        private bool UpcomingMovieExists(int id)
        {
            return context.UpcomingMovies.Any(e => e.UpcomingId == id);
        }
    }
} 