using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.Models;
using BCrypt.Net;

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
            try
            {
                // Check if username already exists
                if (await context.Users.AnyAsync(u => u.Username == userCreateDto.Username))
                {
                    return BadRequest("Username already exists");
                }

                // Check if email already exists
                if (!string.IsNullOrEmpty(userCreateDto.Email) && 
                    await context.Users.AnyAsync(u => u.Email == userCreateDto.Email))
                {
                    return BadRequest("Email already exists");
                }

                // Validate age if provided
                if (userCreateDto.Age.HasValue && (userCreateDto.Age < 1 || userCreateDto.Age > 150))
                {
                    return BadRequest("Age must be between 1 and 150");
                }

                // Validate role
                if (userCreateDto.Role != "user" && userCreateDto.Role != "admin")
                {
                    return BadRequest("Invalid role. Must be 'user' or 'admin'");
                }

                // Validate email format if provided
                if (!string.IsNullOrEmpty(userCreateDto.Email))
                {
                    var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$");
                    if (!emailRegex.IsMatch(userCreateDto.Email))
                    {
                        return BadRequest("Invalid email format");
                    }
                }

                // Validate password strength
                if (string.IsNullOrWhiteSpace(userCreateDto.Password) || userCreateDto.Password.Length < 6)
                {
                    return BadRequest("Password must be at least 6 characters long");
                }

                var user = new User
                {
                    Username = userCreateDto.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password),
                    FullName = userCreateDto.FullName,
                    Age = userCreateDto.Age,
                    Email = userCreateDto.Email,
                    Role = userCreateDto.Role,
                    CreatedAt = DateTime.UtcNow
                };

                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating user: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, UserUpdateDto dto)
        {
            try
            {
                if (id != dto.UserId)
                {
                    return BadRequest("User ID mismatch");
                }

                var user = await context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                // Check if username is being changed and if it already exists
                if (dto.Username != user.Username && 
                    await context.Users.AnyAsync(u => u.Username == dto.Username))
                {
                    return BadRequest("Username already exists");
                }

                // Check if email is being changed and if it already exists
                if (dto.Email != user.Email && 
                    !string.IsNullOrEmpty(dto.Email) &&
                    await context.Users.AnyAsync(u => u.Email == dto.Email))
                {
                    return BadRequest("Email already exists");
                }

                // Validate age if provided
                if (dto.Age.HasValue && (dto.Age < 1 || dto.Age > 150))
                {
                    return BadRequest("Age must be between 1 and 150");
                }

                // Validate role
                if (dto.Role != "user" && dto.Role != "admin")
                {
                    return BadRequest("Invalid role. Must be 'user' or 'admin'");
                }

                // Validate email format if provided
                if (!string.IsNullOrEmpty(dto.Email))
                {
                    var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$");
                    if (!emailRegex.IsMatch(dto.Email))
                    {
                        return BadRequest("Invalid email format");
                    }
                }

                // Update fields
                user.Username = dto.Username;
                user.FullName = dto.FullName;
                user.Age = dto.Age;
                user.Email = dto.Email;
                user.Role = dto.Role;

                // Handle password update if provided
                if (!string.IsNullOrEmpty(dto.Password))
                {
                    if (dto.Password.Length < 6)
                    {
                        return BadRequest("Password must be at least 6 characters long");
                    }
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                }
                else if (!string.IsNullOrEmpty(dto.PasswordHash))
                {
                    user.PasswordHash = dto.PasswordHash;
                }

                await context.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating user: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await context.Users
                .Include(u => u.Favorites)
                .Include(u => u.WatchLists)
                .FirstOrDefaultAsync(u => u.UserId == id);
                
            if (user == null)
            {
                return NotFound("User not found");
            }

            try
            {
                // Remove related records first
                if (user.Favorites.Any())
                {
                    context.Favorites.RemoveRange(user.Favorites);
                }
                
                if (user.WatchLists.Any())
                {
                    context.WatchLists.RemoveRange(user.WatchLists);
                }
                
                // Now remove the user
                context.Users.Remove(user);
                await context.SaveChangesAsync();
                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting user: {ex.Message}");
            }
        }

        // GET: api/UserAPI/search?username=raj&email=gmail.com
        [HttpGet("search")]
        public async Task<ActionResult<List<User>>> SearchUsers(string? username, string? email, string? fullName)
        {
            // Check if at least one search parameter is provided
            if (string.IsNullOrWhiteSpace(username) && string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(fullName))
            {
                return BadRequest("At least one search parameter (username, email, or fullName) is required.");
            }

            var query = context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(username))
                query = query.Where(u => u.Username.Contains(username));

            if (!string.IsNullOrWhiteSpace(email))
                query = query.Where(u => u.Email != null && u.Email.Contains(email));

            if (!string.IsNullOrWhiteSpace(fullName))
                query = query.Where(u => u.FullName != null && u.FullName.Contains(fullName));

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginRequest loginRequest)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(loginRequest.Username) || string.IsNullOrWhiteSpace(loginRequest.Password))
                {
                    return BadRequest("Username and password are required.");
                }

                var user = await context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

                if (user == null)
                {
                    return Unauthorized("Invalid username or password.");
                }

                if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
                {
                    return Unauthorized("Invalid username or password.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error during login: {ex.Message}");
            }
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

        [HttpGet("by-username/{username}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPut("{id}/role")]
        public async Task<ActionResult<User>> UpdateUserRole(int id, [FromBody] UpdateRoleRequest request)
        {
            try
            {
                var user = await context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                if (request.Role != "user" && request.Role != "admin")
                {
                    return BadRequest("Invalid role. Must be 'user' or 'admin'");
                }

                user.Role = request.Role;
                await context.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating user role: {ex.Message}");
            }
        }

        private bool UserExists(int id)
        {
            return context.Users.Any(e => e.UserId == id);
        }
    }
}
