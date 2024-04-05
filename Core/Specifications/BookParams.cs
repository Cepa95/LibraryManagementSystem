namespace Core.Specifications
{
    public class BookParams
    {
        private const int maxPageSize = 50;

        public int PageIndex { get; set; } = 1;

        private int _pageSize = 12;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }

        public int? PublisherId { get; set; }

        public int? CategoryId { get; set; }

        public string Sort { get; set; }

        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}