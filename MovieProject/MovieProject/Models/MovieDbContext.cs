using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MovieProject.Models;

public partial class MovieDbContext : DbContext
{
    public MovieDbContext()
    {
    }

    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<RecMovie> RecMovies { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WatchList> WatchLists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        if (!optionsBuilder.IsConfigured) 
        { 
            
        }
    }

//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//    => optionsBuilder.UseSqlServer("server=RUDRA_PATEL_18\\SQLEXPRESS01; database=MovieDB; trusted_connection=true; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__Favorite__CE74FAD5CBC2C350");

            entity.HasIndex(e => new { e.UserId, e.MovieId }, "UQ__Favorite__A335E50CC2D1DBE1").IsUnique();

            entity.HasOne(d => d.Movie).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.MovieId)
                .HasConstraintName("FK__Favorites__Movie__5AEE82B9");

            entity.HasOne(d => d.User).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Favorites__UserI__59FA5E80")
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.MovieId).HasName("PK__Movies__4BD2941A6A613929");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ImgUrl).HasColumnType("text");
            entity.Property(e => e.MovieGenre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MovieTitle)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Rating).HasColumnType("decimal(3, 1)");
        });

        modelBuilder.Entity<RecMovie>(entity =>
        {
            entity.HasKey(e => e.RecId).HasName("PK__RecMovie__360414DF09D5D02D");

            entity.HasOne(d => d.Movie).WithMany(p => p.RecMovies)
                .HasForeignKey(d => d.MovieId)
                .HasConstraintName("FK__RecMovies__Movie__4D94879B");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C7BD16D06");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4846AC91D").IsUnique();

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("user");
        });

        modelBuilder.Entity<WatchList>(entity =>
        {
            entity.HasKey(e => e.WatchlistId).HasName("PK__WatchLis__48DE55CB1FAAC170");

            entity.ToTable("WatchList");

            entity.HasIndex(e => new { e.UserId, e.MovieId }, "UQ__WatchLis__A335E50C6D51D3E6").IsUnique();

            entity.HasOne(d => d.Movie).WithMany(p => p.WatchLists)
                .HasForeignKey(d => d.MovieId)
                .HasConstraintName("FK__WatchList__Movie__5629CD9C");

            entity.HasOne(d => d.User).WithMany(p => p.WatchLists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__WatchList__UserI__5535A963")
                .OnDelete(DeleteBehavior.Cascade);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
