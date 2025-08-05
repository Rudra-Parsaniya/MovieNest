using System;
using System.Collections.Generic;

namespace MovieProject.Models;

public partial class TrendingMovie
{
    public int TrendingId { get; set; }

    public int? MovieId { get; set; }

    public decimal? TrendingScore { get; set; }

    public virtual Movie? Movie { get; set; }
}
