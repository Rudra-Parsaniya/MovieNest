using System;
using System.Collections.Generic;

namespace MovieProject.Models;

public partial class RecMovie
{
    public int RecId { get; set; }

    public int? MovieId { get; set; }

    public virtual Movie? Movie { get; set; }
}
