namespace API.Dtos
{
    public class BookDtoUpdate
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string SearchCriteria { get; set; }

        public int Pages { get; set; }

        public string ImageUrl { get; set; }

        public int NumberOfCopies { get; set; }

        public int PublisherId { get; set; }

        public int CategoryId { get; set; }
    }
}
