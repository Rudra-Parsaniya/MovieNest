using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingMoviesAPIController : ControllerBase
    {
        private readonly MovieDbContext context;

        public TrendingMoviesAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        // GET: api/TrendingMoviesAPI
        [HttpGet]
        public async Task<ActionResult<List<TrendingMovie>>> GetTrendingMovies()
        {
            var data = await context.TrendingMovies
                .Include(t => t.Movie) // Eager load movie details
                .OrderByDescending(t => t.TrendingScore) // Order by trending score
                .ToListAsync();
            return Ok(data);
        }

        // GET: api/TrendingMoviesAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrendingMovie>> GetTrendingMovieById(int id)
        {
            var trendingMovie = await context.TrendingMovies
                .Include(t => t.Movie)
                .FirstOrDefaultAsync(t => t.TrendingId == id);

            if (trendingMovie == null)
            {
                return NotFound();
            }

            return Ok(trendingMovie);
        }

        [HttpPost]
        public async Task<ActionResult<TrendingMovie>> CreateTrendingMovie(TrendingMovieCreateDto dto)
        {
            var trendingMovie = new TrendingMovie
            {
                MovieId = dto.MovieId,
                TrendingScore = dto.TrendingScore ?? 0.0m
            };

            await context.TrendingMovies.AddAsync(trendingMovie);
            await context.SaveChangesAsync();

            return Ok(trendingMovie);
        }

        // PUT: api/TrendingMoviesAPI/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TrendingMovie>> UpdateTrendingMovie(int id, TrendingMovieUpdateDto dto)
        {
            if (id != dto.TrendingId)
            {
                return BadRequest("Trending Movie ID mismatch");
            }

            var trendingMovie = await context.TrendingMovies.FindAsync(id);
            if (trendingMovie == null)
            {
                return NotFound("Trending Movie not found");
            }

            trendingMovie.MovieId = dto.MovieId;
            trendingMovie.TrendingScore = dto.TrendingScore ?? trendingMovie.TrendingScore;

            context.Entry(trendingMovie).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrendingMovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(trendingMovie);
        }

        // DELETE: api/TrendingMoviesAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTrendingMovie(int id)
        {
            var trendingMovie = await context.TrendingMovies.FindAsync(id);
            if (trendingMovie == null)
            {
                return NotFound();
            }

            context.TrendingMovies.Remove(trendingMovie);
            await context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/TrendingMoviesAPI/search?movieId=3&minScore=7.5
        [HttpGet("search")]
        public async Task<ActionResult<List<TrendingMovie>>> SearchTrendingMovies(int? movieId, decimal? minScore, decimal? maxScore)
        {
            var query = context.TrendingMovies.Include(t => t.Movie).AsQueryable();

            if (movieId.HasValue)
                query = query.Where(t => t.MovieId == movieId);

            if (minScore.HasValue)
                query = query.Where(t => t.TrendingScore >= minScore.Value);

            if (maxScore.HasValue)
                query = query.Where(t => t.TrendingScore <= maxScore.Value);

            var result = await query.OrderByDescending(t => t.TrendingScore).ToListAsync();
            return Ok(result);
        }

        // GET: api/TrendingMoviesAPI/top?count=10
        [HttpGet("top")]
        public async Task<ActionResult<List<TrendingMovie>>> GetTopTrendingMovies(int count = 10)
        {
            var topTrendingMovies = await context.TrendingMovies
                .Include(t => t.Movie)
                .OrderByDescending(t => t.TrendingScore)
                .Take(count)
                .ToListAsync();

            return Ok(topTrendingMovies);
        }

        // GET: api/TrendingMoviesAPI/score-range
        [HttpGet("score-range")]
        public async Task<ActionResult<object>> GetTrendingScoreRange()
        {
            var scoreStats = await context.TrendingMovies
                .Where(t => t.TrendingScore.HasValue)
                .Select(t => t.TrendingScore!.Value)
                .ToListAsync();

            if (!scoreStats.Any())
            {
                return Ok(new { min = 0, max = 0, average = 0 });
            }

            return Ok(new
            {
                min = scoreStats.Min(),
                max = scoreStats.Max(),
                average = Math.Round(scoreStats.Average(), 2)
            });
        }

        // GET: api/TrendingMoviesAPI/dropdown
        [HttpGet("dropdown")]
        public async Task<ActionResult<List<object>>> GetMovieDropdown()
        {
            var movies = await context.Movies
                .Select(m => new { m.MovieId, m.MovieTitle })
                .OrderBy(m => m.MovieTitle)
                .ToListAsync();

            return Ok(movies);
        }

        private bool TrendingMovieExists(int id)
        {
            return context.TrendingMovies.Any(e => e.TrendingId == id);
        }
    }
} 