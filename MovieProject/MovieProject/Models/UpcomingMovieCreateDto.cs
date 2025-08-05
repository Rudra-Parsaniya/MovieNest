namespace MovieProject.Models;

public class UpcomingMovieCreateDto
{
    public string MovieTitle { get; set; } = null!;
    public string? MovieGenre { get; set; }
    public int? ReleaseYear { get; set; }
    public string? ImgUrl { get; set; }
    public string? Description { get; set; }
    public int? Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string? TrailerUrl { get; set; }
}

public class UpcomingMovieUpdateDto
{
    public int UpcomingId { get; set; }
    public string MovieTitle { get; set; } = null!;
    public string? MovieGenre { get; set; }
    public int? ReleaseYear { get; set; }
    public string? ImgUrl { get; set; }
    public string? Description { get; set; }
    public int? Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string? TrailerUrl { get; set; }
} 