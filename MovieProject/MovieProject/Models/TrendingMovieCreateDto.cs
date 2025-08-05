namespace MovieProject.Models;

public class TrendingMovieCreateDto
{
    public int? MovieId { get; set; }
    public decimal? TrendingScore { get; set; }
}

public class TrendingMovieUpdateDto
{
    public int TrendingId { get; set; }
    public int? MovieId { get; set; }
    public decimal? TrendingScore { get; set; }
} 