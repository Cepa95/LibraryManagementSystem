using Core.Entities;

namespace Core.Specifications
{
    public class LoanSpecification : BaseSpecification<Loan>
    {
        public LoanSpecification()
        {
            AddInclude(x => x.User);
            AddInclude(x => x.Book);
        }

        public LoanSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.User);
            AddInclude(x => x.Book);
        }
        

    }
}