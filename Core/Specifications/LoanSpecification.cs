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

        // public LoanSpecification(int loanId) : base(x => x.Id == loanId)
        // {
        //     AddInclude(x => x.User);
        //     AddInclude(x => x.Book);
        // }

        // Constructor that takes user id (integer)
        public LoanSpecification (int userId) : base(x => x.UserId == userId)
        {
            AddInclude(x => x.User);
            AddInclude(x => x.Book);
        }
    }

    
}