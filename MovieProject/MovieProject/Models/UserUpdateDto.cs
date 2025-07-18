namespace MovieProject.Models
{
    public class UserUpdateDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? FullName { get; set; }
        public int? Age { get; set; }
        public string? Email { get; set; }
    }
}
