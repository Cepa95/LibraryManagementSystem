namespace API.Dtos
{
    public class BookDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public int Pages { get; set; }

        public string ImageUrl { get; set; }

        public int NumberOfCopies { get; set; }

        public string Publisher { get; set; }

        public string Category { get; set; }
    }
}