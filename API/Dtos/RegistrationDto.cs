// UserRegistrationDto.cs
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegistrationDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        // [MinLength(6)] // Add any password requirements you want
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public required string DateOfBirth { get; set; }
        public required string Role { get; set; }
    }
}
