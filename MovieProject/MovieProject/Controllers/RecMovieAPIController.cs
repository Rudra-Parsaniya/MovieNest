using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecMovieAPIController : ControllerBase
    {
        private readonly MovieDbContext context;

        public RecMovieAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        // GET: api/RecMovieAPI
        [HttpGet]
        public async Task<ActionResult<List<RecMovie>>> GetRecMovies()
        {
            var data = await context.RecMovies
                .Include(r => r.Movie) // Eager load movie details if desired
                .ToListAsync();
            return Ok(data);
        }

        // GET: api/RecMovieAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecMovie>> GetRecMovieById(int id)
        {
            var recMovie = await context.RecMovies
                .Include(r => r.Movie)
                .FirstOrDefaultAsync(r => r.RecId == id);

            if (recMovie == null)
            {
                return NotFound();
            }

            return Ok(recMovie);
        }

        [HttpPost]
        public async Task<ActionResult<RecMovie>> CreateRecMovie(RecMovieCreateDto dto)
        {
            var recMovie = new RecMovie
            {
                MovieId = dto.MovieId
            };

            await context.RecMovies.AddAsync(recMovie);
            await context.SaveChangesAsync();

            return Ok(recMovie);
        }

        

        // PUT: api/RecMovieAPI/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RecMovie>> UpdateRecMovie(int id, RecMovie recMovie)
        {
            if (id != recMovie.RecId)
            {
                return BadRequest();
            }

            context.Entry(recMovie).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecMovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(recMovie);
        }

        // DELETE: api/RecMovieAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRecMovie(int id)
        {
            var recMovie = await context.RecMovies.FindAsync(id);
            if (recMovie == null)
            {
                return NotFound();
            }

            context.RecMovies.Remove(recMovie);
            await context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/RecMovieAPI/search?movieId=3
        [HttpGet("search")]
        public async Task<ActionResult<List<RecMovie>>> SearchRecMovies(int? movieId)
        {
            var query = context.RecMovies.Include(r => r.Movie).AsQueryable();

            if (movieId.HasValue)
                query = query.Where(r => r.MovieId == movieId);

            var result = await query.ToListAsync();
            return Ok(result);
        }

        private bool RecMovieExists(int id)
        {
            return context.RecMovies.Any(e => e.RecId == id);
        }
    }
}
