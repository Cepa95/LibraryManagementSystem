using Core.Entities;

namespace Core.Specifications
{
    public class AuthorWithBookSpecification : BaseSpecification<AuthorBook>
    {
        public AuthorWithBookSpecification()
        {
            AddInclude(x => x.Author);
            AddInclude(x => x.Book);
        }

        public AuthorWithBookSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Author);
            AddInclude(x => x.Book);
        }
        

    }
}