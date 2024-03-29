namespace Core.Entities
{
    public class Author : BaseEntity
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }
        
        public required string Biography { get; set; }

    }
}