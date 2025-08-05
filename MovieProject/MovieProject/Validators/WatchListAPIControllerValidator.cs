using FluentValidation;
using MovieProject.Models;

namespace MovieProject.Validators
{
    public class WatchListCreateDtoValidator : AbstractValidator<WatchListCreateDto>
    {
        public WatchListCreateDtoValidator()
        {
            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User ID must be greater than 0");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0");
        }
    }

    public class WatchListUpdateDtoValidator : AbstractValidator<WatchListUpdateDto>
    {
        public WatchListUpdateDtoValidator()
        {
            RuleFor(x => x.WatchlistId)
                .GreaterThan(0).WithMessage("WatchList ID must be greater than 0");

            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User ID must be greater than 0");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0");
        }
    }
}
