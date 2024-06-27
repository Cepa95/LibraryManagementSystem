namespace API.Dtos
{
    public class LoanDto
    {
        public int Id { get; set; }

        public DateTimeOffset BorrowedDate { get; set; }

        public DateTimeOffset ReturnedDate { get; set; }

        public int NumberOfBorrowedBooks { get; set; }

        public UserDto User { get; set; }

        public BookDto Book { get; set; }
    }
}