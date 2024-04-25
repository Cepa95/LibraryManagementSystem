namespace API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        public required string PhoneNumber { get; set; }

        public DateTimeOffset  DateOfBirth { get; set; }
        
        public required string Role { get; set; }
        
    }
}