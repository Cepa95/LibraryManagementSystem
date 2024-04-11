namespace API.Dtos
{
    public class LoanUpdateDto
    {

        public DateTime BorrowedDate { get; set; }

        public DateTime ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}