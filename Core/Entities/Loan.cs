namespace Core.Entities
{
    public class Loan : BaseEntity
    {
        public DateTime BorrowedDate { get; set; }

        public DateTime ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public Book Book { get; set; }
        
        public int BookId { get; set; }
        
    }
}