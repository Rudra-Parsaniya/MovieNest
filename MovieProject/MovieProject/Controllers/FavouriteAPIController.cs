using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteAPIController : ControllerBase
    {
        private readonly MovieDbContext context;

        public FavouriteAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        // GET: api/FavouriteAPI
        [HttpGet]
        public async Task<ActionResult<List<Favorite>>> GetFavourites()
        {
            var data = await context.Favorites
                .Include(f => f.User)
                .Include(f => f.Movie)
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/FavouriteAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favorite>> GetFavouriteById(int id)
        {
            var favourite = await context.Favorites
                .Include(f => f.User)
                .Include(f => f.Movie)
                .FirstOrDefaultAsync(f => f.FavoriteId == id);

            if (favourite == null)
            {
                return NotFound();
            }

            return Ok(favourite);
        }

        // POST: api/FavouriteAPI
        [HttpPost]
        public async Task<ActionResult<Favorite>> CreateFavourite([FromBody] FavouriteCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid data.");
            }

            var favourite = new Favorite
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId
            };

            context.Favorites.Add(favourite);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFavouriteById), new { id = favourite.FavoriteId }, favourite);
        }

        // PUT: api/FavouriteAPI/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Favorite>> UpdateFavourite(int id, [FromBody] FavouriteUpdateDto dto)
        {
            if (dto == null || id != dto.FavouriteId)
            {
                return BadRequest("Invalid data.");
            }

            var favourite = await context.Favorites.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }

            favourite.UserId = dto.UserId;
            favourite.MovieId = dto.MovieId;

            await context.SaveChangesAsync();

            return Ok(favourite);
        }

        // DELETE: api/FavouriteAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFavourite(int id)
        {
            var favourite = await context.Favorites.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }

            context.Favorites.Remove(favourite);
            await context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/FavouriteAPI/search?userId=1&movieId=5
        [HttpGet("search")]
        public async Task<ActionResult<List<Favorite>>> SearchFavourites(int? userId, int? movieId)
        {
            var query = context.Favorites
                .Include(f => f.User)
                .Include(f => f.Movie)
                .AsQueryable();

            if (userId.HasValue)
                query = query.Where(f => f.UserId == userId);

            if (movieId.HasValue)
                query = query.Where(f => f.MovieId == movieId);

            var result = await query.ToListAsync();
            return Ok(result);
        }


        private bool FavouriteExists(int id)
        {
            return context.Favorites.Any(e => e.FavoriteId == id);
        }
    }
}
