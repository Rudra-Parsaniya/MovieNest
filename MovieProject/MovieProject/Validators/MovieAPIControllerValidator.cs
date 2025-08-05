using FluentValidation;
using MovieProject.Models;

namespace MovieProject.Validators
{
    public class MovieCreateDtoValidator : AbstractValidator<MovieCreateDto>
    {
        public MovieCreateDtoValidator()
        {
            RuleFor(x => x.MovieTitle)
                .NotEmpty().WithMessage("Movie title is required")
                .MaximumLength(255).WithMessage("Movie title cannot exceed 255 characters");

            RuleFor(x => x.MovieGenre)
                .MaximumLength(100).WithMessage("Movie genre cannot exceed 100 characters")
                .When(x => !string.IsNullOrEmpty(x.MovieGenre));

            RuleFor(x => x.ReleaseYear)
                .InclusiveBetween(1900, 2100).WithMessage("Release year must be between 1900 and 2100")
                .When(x => x.ReleaseYear.HasValue);

            RuleFor(x => x.Rating)
                .InclusiveBetween(0, 10).WithMessage("Rating must be between 0 and 10")
                .When(x => x.Rating.HasValue);

            RuleFor(x => x.Duration)
                .GreaterThan(0).WithMessage("Duration must be greater than 0")
                .LessThanOrEqualTo(480).WithMessage("Duration cannot exceed 480 minutes (8 hours)")
                .When(x => x.Duration.HasValue);

            RuleFor(x => x.ImgUrl)
                .MaximumLength(500).WithMessage("Image URL cannot exceed 500 characters")
                .When(x => !string.IsNullOrEmpty(x.ImgUrl));

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters")
                .When(x => !string.IsNullOrEmpty(x.Description));
        }
    }

    public class MovieUpdateDtoValidator : AbstractValidator<MovieUpdateDto>
    {
        public MovieUpdateDtoValidator()
        {
            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0");

            RuleFor(x => x.MovieTitle)
                .NotEmpty().WithMessage("Movie title is required")
                .MaximumLength(255).WithMessage("Movie title cannot exceed 255 characters");

            RuleFor(x => x.MovieGenre)
                .MaximumLength(100).WithMessage("Movie genre cannot exceed 100 characters")
                .When(x => !string.IsNullOrEmpty(x.MovieGenre));

            RuleFor(x => x.ReleaseYear)
                .InclusiveBetween(1900, 2100).WithMessage("Release year must be between 1900 and 2100")
                .When(x => x.ReleaseYear.HasValue);

            RuleFor(x => x.Rating)
                .InclusiveBetween(0, 10).WithMessage("Rating must be between 0 and 10")
                .When(x => x.Rating.HasValue);

            RuleFor(x => x.Duration)
                .GreaterThan(0).WithMessage("Duration must be greater than 0")
                .LessThanOrEqualTo(480).WithMessage("Duration cannot exceed 480 minutes (8 hours)")
                .When(x => x.Duration.HasValue);

            RuleFor(x => x.ImgUrl)
                .MaximumLength(500).WithMessage("Image URL cannot exceed 500 characters")
                .When(x => !string.IsNullOrEmpty(x.ImgUrl));

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters")
                .When(x => !string.IsNullOrEmpty(x.Description));
        }
    }
}
