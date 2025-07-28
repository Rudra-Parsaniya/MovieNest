namespace MovieProject.Models
{
    public class UserCreateDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? FullName { get; set; }
        public int? Age { get; set; }
        public string? Email { get; set; }
        public string Role { get; set; } = "user";
    }
}
