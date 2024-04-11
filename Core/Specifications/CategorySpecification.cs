using Core.Entities;

namespace Core.Specifications
{
    public class CategorySpecification : BaseSpecification<Category>
    {
        public CategorySpecification()
        {
            AddOrderBy(c => c.Name);
        }

        public CategorySpecification(int id) : base(x => x.Id == id)
        {
        }
    }
}