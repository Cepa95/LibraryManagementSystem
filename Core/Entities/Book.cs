namespace Core.Entities
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int Pages { get; set; }

        public string ImageUrl { get; set; }

        public int NumberOfCopies { get; set; }

        public Publisher Publisher { get; set; }

        public int PublisherId { get; set; }

        public Category Category { get; set; }

        public int CategoryId { get; set; }
        
    }
}