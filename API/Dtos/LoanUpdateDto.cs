namespace API.Dtos
{
    public class LoanUpdateDto
    {
        public DateTimeOffset BorrowedDate { get; set; }

        public DateTimeOffset ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}