using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MovieProject.Models;

public partial class Movie
{
    
    public int MovieId { get; set; }

    public string MovieTitle { get; set; } = null!;

    public string? MovieGenre { get; set; }

    public int? ReleaseYear { get; set; }

    public string? ImgUrl { get; set; }

    public decimal? Rating { get; set; }

    public string? Description { get; set; }

    public int? Duration { get; set; }

    [JsonIgnore]
    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    [JsonIgnore]
    public virtual ICollection<RecMovie> RecMovies { get; set; } = new List<RecMovie>();
    [JsonIgnore]
    public virtual ICollection<WatchList> WatchLists { get; set; } = new List<WatchList>();
}
