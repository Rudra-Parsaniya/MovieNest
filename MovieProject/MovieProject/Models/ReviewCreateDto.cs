namespace MovieProject.Models
{
    public class ReviewCreateDto
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string Content { get; set; } = null!;
    }

}
