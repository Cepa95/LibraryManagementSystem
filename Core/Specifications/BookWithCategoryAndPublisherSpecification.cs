using Core.Entities;

namespace Core.Specifications
{
    public class BookWithCategoryAndPublisherSpecification : BaseSpecification<Book>
    {
        public BookWithCategoryAndPublisherSpecification(BookParams bookParams) : base(x =>
            (string.IsNullOrEmpty(bookParams.Search)
            || bookParams.Search.Split(new char[] { ' ' }).All(searchTerm => x.SearchCriteria.ToLower().Contains(searchTerm.Trim()))) &&
            (!bookParams.PublisherId.HasValue || x.PublisherId == bookParams.PublisherId) &&
            (!bookParams.CategoryId.HasValue || x.CategoryId == bookParams.CategoryId))
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Publisher);
            AddOrderBy(x => x.Title);
            ApplyPaging(bookParams.PageSize * (bookParams.PageIndex - 1), bookParams.PageSize);

            if (!string.IsNullOrEmpty(bookParams.Sort))
            {
                switch (bookParams.Sort)
                {
                    case "titleAsc":
                        AddOrderBy(x => x.Title);
                        break;
                    case "titleDesc":
                        AddOrderByDescending(x => x.Title);
                        break;
                    case "pagesAsc":
                        AddOrderBy(x => x.Pages);
                        break;
                    case "pagesDesc":
                        AddOrderByDescending(x => x.Pages);
                        break;
                    case "copiesAsc":
                        AddOrderBy(x => x.NumberOfCopies);
                        break;
                    case "copiesDesc":
                        AddOrderByDescending(x => x.NumberOfCopies);
                        break;
                    default:
                        AddOrderBy(x => x.Title);
                        break;
                }
            }
        }

        public BookWithCategoryAndPublisherSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Publisher);
        }


    }
}