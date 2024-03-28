namespace Core.Entities
{
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        
        public string Biography { get; set; }

    }
}