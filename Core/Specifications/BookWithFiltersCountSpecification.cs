
using Core.Entities;

namespace Core.Specifications
{
    public class BookWithFiltersCountSpecification : BaseSpecification<Book>
    {
        public BookWithFiltersCountSpecification(BookParams bookParams)
        : base(x =>
            (string.IsNullOrEmpty(bookParams.Search)
            || bookParams.Search.Split(new char[] { ' ' }).All(searchTerm => x.SearchCriteria.ToLower().Contains(searchTerm.Trim()))) &&
            (!bookParams.PublisherId.HasValue || x.PublisherId == bookParams.PublisherId) &&
            (!bookParams.CategoryId.HasValue || x.CategoryId == bookParams.CategoryId))
        {
        }
    }
}