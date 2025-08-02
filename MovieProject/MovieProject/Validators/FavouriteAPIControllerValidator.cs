using FluentValidation;
using MovieProject.Models;

namespace MovieProject.Validators
{
    public class FavouriteCreateDtoValidator : AbstractValidator<FavouriteCreateDto>
    {
        public FavouriteCreateDtoValidator()
        {
            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User ID must be greater than 0");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0");
        }
    }

    public class FavouriteUpdateDtoValidator : AbstractValidator<FavouriteUpdateDto>
    {
        public FavouriteUpdateDtoValidator()
        {
            RuleFor(x => x.FavouriteId)
                .GreaterThan(0).WithMessage("Favourite ID must be greater than 0");

            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User ID must be greater than 0");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("Movie ID must be greater than 0");
        }
    }
}
