namespace API.Dtos
{
    public class LoanDto
    {
        public int Id { get; set; }

        public DateTimeOffset BorrowedDate { get; set; }

        public DateTimeOffset ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public int User { get; set; }

        public int Book { get; set; }
    }
}