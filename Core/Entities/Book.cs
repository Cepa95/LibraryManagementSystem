namespace Core.Entities
{
    public class Book : BaseEntity
    {
        public required string Title { get; set; }

        public required string Description { get; set; }

        public int Pages { get; set; }

        public required string ImageUrl { get; set; }

        public int NumberOfCopies { get; set; }

        public required Publisher Publisher { get; set; }

        public int PublisherId { get; set; }

        public required Category Category { get; set; }

        public int CategoryId { get; set; }
        
    }
}