using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MovieProject.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? FullName { get; set; }

    public int? Age { get; set; }

    public string? Email { get; set; }

    public string Role { get; set; } = "user";

    public DateTime? CreatedAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    [JsonIgnore]
    public virtual ICollection<WatchList> WatchLists { get; set; } = new List<WatchList>();
}
