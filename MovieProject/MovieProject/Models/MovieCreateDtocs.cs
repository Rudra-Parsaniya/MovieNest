namespace MovieProject.Models;

public class MovieCreateDto
{
    public string MovieTitle { get; set; } = null!;

    public string? MovieGenre { get; set; }

    public int? ReleaseYear { get; set; }

    public string? ImgUrl { get; set; }

    public decimal? Rating { get; set; }

    public string? Description { get; set; }

    public int? Duration { get; set; }
}

