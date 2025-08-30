using System;
using System.Text.Json.Serialization;

namespace MovieProject.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsPinned { get; set; } = false;

        [JsonIgnore]
        public virtual User? User { get; set; }

        [JsonIgnore]
        public virtual Movie? Movie { get; set; }
    }
}
