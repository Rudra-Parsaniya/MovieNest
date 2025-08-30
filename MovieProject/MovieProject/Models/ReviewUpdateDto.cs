namespace MovieProject.Models
{
    public class ReviewUpdateDto
    {
        public int ReviewId { get; set; }
        public string Content { get; set; } = null!;
    }
}