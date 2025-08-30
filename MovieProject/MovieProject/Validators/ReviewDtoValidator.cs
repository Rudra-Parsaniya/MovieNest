using FluentValidation;
using MovieProject.Models;

namespace MovieProject.Validators
{
    public class ReviewCreateDtoValidator : AbstractValidator<ReviewCreateDto>
    {
        public ReviewCreateDtoValidator()
        {
            RuleFor(x => x.UserId).GreaterThan(0);
            RuleFor(x => x.MovieId).GreaterThan(0);
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Review content is required")
                .MaximumLength(2000).WithMessage("Review cannot exceed 2000 characters");
        }
    }

    public class ReviewUpdateDtoValidator : AbstractValidator<ReviewUpdateDto>
    {
        public ReviewUpdateDtoValidator()
        {
            RuleFor(x => x.ReviewId).GreaterThan(0);
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Review content is required")
                .MaximumLength(2000).WithMessage("Review cannot exceed 2000 characters");
        }
    }
}
