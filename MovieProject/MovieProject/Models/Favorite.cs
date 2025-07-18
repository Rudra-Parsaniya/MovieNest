using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MovieProject.Models;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public int? UserId { get; set; }

    public int? MovieId { get; set; }
    [JsonIgnore]
    public virtual Movie? Movie { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
}
