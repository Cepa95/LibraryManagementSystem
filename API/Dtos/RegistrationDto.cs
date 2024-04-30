using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegistrationDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        // [MinLength(6)] // Add any password requirements you want
        public string Password { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public DateTimeOffset DateOfBirth { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
