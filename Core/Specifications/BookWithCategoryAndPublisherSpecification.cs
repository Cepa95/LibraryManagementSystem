using Core.Entities;

namespace Core.Specifications
{
    public class BookWithCategoryAndPublisherSpecification : BaseSpecification<Book>
    {
        public BookWithCategoryAndPublisherSpecification()
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Publisher);
        }

        public BookWithCategoryAndPublisherSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Publisher);
        }
        

    }
}