using Core.Entities;

namespace Core.Specifications
{
    public class PublisherSpecification : BaseSpecification<Publisher>
    {
        public PublisherSpecification()
        {
            AddOrderBy(p => p.Name);
        }
    }
}