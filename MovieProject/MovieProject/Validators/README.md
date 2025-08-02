# FluentValidation Implementation

This project uses FluentValidation for input validation across all API endpoints. The validation is automatically applied to all DTOs when they are used in controller actions.

## Validators Overview

### Movie Validators
- **MovieCreateDtoValidator**: Validates movie creation requests
  - Movie title: Required, 1-200 characters
  - Genre: Optional, max 50 characters
  - Release year: Optional, between 1888 and current year + 10
  - Image URL: Optional, valid URL format, max 500 characters
  - Rating: Optional, between 0-10
  - Description: Optional, max 2000 characters
  - Duration: Optional, between 1-600 minutes

### User Validators
- **UserCreateDtoValidator**: Validates user registration
  - Username: Required, 3-50 characters, alphanumeric + underscore only
  - Password: Required, 6-100 characters
  - Full name: Optional, max 100 characters
  - Age: Optional, 1-150
  - Email: Optional, valid email format, max 100 characters
  - Role: Required, must be "user" or "admin"

- **UserUpdateDtoValidator**: Validates user updates
  - User ID: Required, greater than 0
  - Username: Required, 3-50 characters, alphanumeric + underscore only
  - Full name: Optional, max 100 characters
  - Age: Optional, 1-150
  - Email: Optional, valid email format, max 100 characters
  - Role: Required, must be "user" or "admin"
  - Password: Optional, 6-100 characters

- **LoginRequestValidator**: Validates login requests
  - Username: Required, 3-50 characters
  - Password: Required, non-empty

- **UpdateRoleRequestValidator**: Validates role update requests
  - Role: Required, must be "user" or "admin"

### Favourite Validators
- **FavouriteCreateDtoValidator**: Validates favourite creation
  - User ID: Required, greater than 0
  - Movie ID: Required, greater than 0

- **FavouriteUpdateDtoValidator**: Validates favourite updates
  - Favourite ID: Required, greater than 0
  - User ID: Required, greater than 0
  - Movie ID: Required, greater than 0

### WatchList Validators
- **WatchListCreateDtoValidator**: Validates watchlist creation
  - User ID: Required, greater than 0
  - Movie ID: Required, greater than 0

- **WatchListUpdateDtoValidator**: Validates watchlist updates
  - WatchList ID: Required, greater than 0
  - User ID: Required, greater than 0
  - Movie ID: Required, greater than 0

### Recommendation Validators
- **RecMovieCreateDtoValidator**: Validates recommendation creation
  - Movie ID: Optional, greater than 0 when provided

## Configuration

FluentValidation is configured in `Program.cs`:

```csharp
builder.Services.AddControllers()
    .AddFluentValidation(fv => 
    {
        fv.RegisterValidatorsFromAssemblyContaining<MovieCreateDtoValidator>();
        fv.DisableDataAnnotationsValidation = true;
    });
```

## Error Handling

Validation errors are handled by the `ExceptionMiddleware` and return a structured JSON response:

```json
{
  "StatusCode": 400,
  "Message": "Validation failed",
  "Errors": [
    {
      "PropertyName": "Username",
      "ErrorMessage": "Username is required"
    }
  ],
  "Status": "ValidationError"
}
```

## Usage

Validators are automatically applied when DTOs are used in controller actions. No additional code is required in controllers.

Example:
```csharp
[HttpPost]
public async Task<ActionResult<Movie>> CreateMovie(MovieCreateDto dto)
{
    // Validation is automatically applied before this method is called
    // If validation fails, a 400 Bad Request is returned with validation errors
    // If validation passes, this method executes normally
}
```

## Adding New Validators

To add a new validator:

1. Create a new validator class in the `Validators` folder
2. Inherit from `AbstractValidator<T>` where T is your DTO
3. Define validation rules in the constructor
4. The validator will be automatically registered

Example:
```csharp
public class NewDtoValidator : AbstractValidator<NewDto>
{
    public NewDtoValidator()
    {
        RuleFor(x => x.Property)
            .NotEmpty().WithMessage("Property is required");
    }
}
``` 