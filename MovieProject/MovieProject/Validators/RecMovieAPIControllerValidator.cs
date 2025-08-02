using FluentValidation;
using MovieProject.Models;

namespace MovieProject.Validators
{
    public class RecMovieCreateDtoValidator : AbstractValidator<RecMovieCreateDto>
    {
        public RecMovieCreateDtoValidator()
        {
            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0")
                .When(x => x.MovieId.HasValue);
        }
    }
}
