namespace API.Dtos
{
    public class AuthorUpdateDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }
        
        public required string Biography { get; set; }
    }

}