using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewAPIController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public ReviewAPIController(MovieDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews(int? movieId)
        {
            var query = _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Movie)
                .AsQueryable();

            if (movieId.HasValue)
                query = query.Where(r => r.MovieId == movieId);

            return Ok(await query.OrderByDescending(r => r.IsPinned).ThenByDescending(r => r.CreatedAt).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Movie)
                .FirstOrDefaultAsync(r => r.ReviewId == id);

            if (review == null) return NotFound();
            return Ok(review);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview(ReviewCreateDto dto)
        {
            var review = new Review
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId,
                Content = dto.Content
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReview), new { id = review.ReviewId }, review);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Review>> UpdateReview(int id, ReviewUpdateDto dto)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();

            review.Content = dto.Content;
            review.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(review);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Review deleted" });
        }

        [HttpPut("{id}/pin")]
        public async Task<ActionResult<Review>> PinReview(int id, bool isPinned)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();

            review.IsPinned = isPinned;
            await _context.SaveChangesAsync();
            return Ok(review);
        }
    }
}
