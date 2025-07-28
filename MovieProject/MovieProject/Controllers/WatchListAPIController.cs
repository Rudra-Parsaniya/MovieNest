using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;


namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchListAPIController : ControllerBase
    {
        private readonly MovieDbContext context;

        public WatchListAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        // GET: api/WatchListAPI
        [HttpGet]
        public async Task<ActionResult<List<WatchList>>> GetWatchLists()
        {
            var data = await context.WatchLists
                .Include(w => w.User)
                .Include(w => w.Movie)
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/WatchListAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WatchList>> GetWatchListById(int id)
        {
            var watchlist = await context.WatchLists
                .Include(w => w.User)
                .Include(w => w.Movie)
                .FirstOrDefaultAsync(w => w.WatchlistId == id);

            if (watchlist == null)
            {
                return NotFound();
            }

            return Ok(watchlist);
        }

        // POST: api/WatchListAPI
        [HttpPost]
        public async Task<ActionResult<WatchList>> CreateWatchList([FromBody]WatchListCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid data.");
            }

            var watchlist = new WatchList
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId
            };

            context.WatchLists.Add(watchlist);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWatchListById), new { id = watchlist.WatchlistId }, watchlist);
        }

        // PUT: api/WatchListAPI/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WatchList>> UpdateWatchList(int id,[FromBody]WatchListUpdateDto dto)
        {
            if (dto == null || id != dto.WatchlistId)
            {
                return BadRequest("Invalid data.");
            }

            var watchlist = await context.WatchLists.FindAsync(id);
            if (watchlist == null)
            {
                return NotFound();
            }

            watchlist.UserId = dto.UserId;
            watchlist.MovieId = dto.MovieId;

            await context.SaveChangesAsync();

            return Ok(watchlist);
        }

        // DELETE: api/WatchListAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWatchList(int id)
        {
            var watchlist = await context.WatchLists.FindAsync(id);
            if (watchlist == null)
            {
                return NotFound();
            }

            context.WatchLists.Remove(watchlist);
            await context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/WatchListAPI/search?userId=2
        [HttpGet("search")]
        public async Task<ActionResult<List<WatchList>>> SearchWatchList(int? userId, int? movieId)
        {
            var query = context.WatchLists
                .Include(w => w.User)
                .Include(w => w.Movie)
                .AsQueryable();

            if (userId.HasValue)
                query = query.Where(w => w.UserId == userId);

            if (movieId.HasValue)
                query = query.Where(w => w.MovieId == movieId);

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpGet("dropdown")]
        public async Task<ActionResult<List<object>>> GetMovieDropdown()
        {
            var movies = await context.Movies
                .Select(m => new { m.MovieId, m.MovieTitle })
                .OrderBy(m => m.MovieTitle)
                .ToListAsync();

            return Ok(movies);
        }



        private bool WatchListExists(int id)
        {
            return context.WatchLists.Any(e => e.WatchlistId == id);
        }


    }
}
