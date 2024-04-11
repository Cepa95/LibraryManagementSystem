namespace API.Dtos
{
    public class LoanDto
    {
        public int Id { get; set; }

        public DateTime BorrowedDate { get; set; }

        public DateTime ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public string User { get; set; }

        public string Book { get; set; }
    }
}