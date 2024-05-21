using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserUpdateDto
    {

        public string FirstName { get; set; }


        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }


        public DateTimeOffset DateOfBirth { get; set; }


        public string Role { get; set; }
    }
}
