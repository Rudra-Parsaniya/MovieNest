using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        private readonly MovieDbContext context;

        public UserAPIController(MovieDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var data = await context.Users.ToListAsync();

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await context.Users
                //.Include(u => u.WatchLists)
                //.Include(u => u.Favorites)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser([FromBody] UserCreateDto userCreateDto)
        {
            var user = new User
            {
                Username = userCreateDto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password),
                FullName = userCreateDto.FullName,
                Age = userCreateDto.Age,
                Email = userCreateDto.Email,
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, UserUpdateDto dto)
        {
            if (id != dto.UserId)
            {
                return BadRequest();
            }

            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Update fields
            user.Username = dto.Username;
            user.PasswordHash = dto.PasswordHash;
            user.FullName = dto.FullName;
            user.Age = dto.Age;
            user.Email = dto.Email;

            await context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/UserAPI/search?username=raj&email=gmail.com
        [HttpGet("search")]
        public async Task<ActionResult<List<User>>> SearchUsers(string? username, string? email, string? fullName)
        {
            var query = context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(username))
                query = query.Where(u => u.Username.Contains(username));

            if (!string.IsNullOrWhiteSpace(email))
                query = query.Where(u => u.Email.Contains(email));

            if (!string.IsNullOrWhiteSpace(fullName))
                query = query.Where(u => u.FullName.Contains(fullName));

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginRequest loginRequest)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(user);
        }

        [HttpGet("dropdown")]
        public async Task<ActionResult<List<object>>> GetUserDropdown()
        {
            var users = await context.Users
                .Select(u => new { u.UserId, u.Username })
                .OrderBy(u => u.Username)
                .ToListAsync();

            return Ok(users);
        }

        private bool UserExists(int id)
        {
            return context.Users.Any(e => e.UserId == id);
        }
    }
}
