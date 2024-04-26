using System.Text.Json;
using Core.Entities;
namespace Infrastructure.Data
{
    public class LibraryContextSeed
    {
        public static async Task SeedAsync(LibraryContext context)
        {

            if (!context.Category.Any())
            {
                var categoriesData = File.ReadAllText("../Infrastructure/Data/SeedData/category.json");
                var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);

                foreach (var item in categories)
                {
                    context.Category.Add(item);
                }

                await context.SaveChangesAsync();
            }

            if (!context.Publisher.Any())
            {
                var publisherData = File.ReadAllText("../Infrastructure/Data/SeedData/publisher.json");
                var publishers = JsonSerializer.Deserialize<List<Publisher>>(publisherData);

                foreach (var publisher in publishers)
                {
                    context.Publisher.Add(publisher);
                }

                await context.SaveChangesAsync();
            }

            if (!context.Book.Any())
            {
                var booksData = File.ReadAllText("../Infrastructure/Data/SeedData/book.json");
                var books = JsonSerializer.Deserialize<List<Book>>(booksData);

                foreach (var book in books)
                {
                    if (!context.Book.Any(b => b.Id == book.Id))
                    {
                        context.Book.Add(book);
                    }
                }

                await context.SaveChangesAsync();
            }
            if (!context.Author.Any())
            {
                var authorData = File.ReadAllText("../Infrastructure/Data/SeedData/author.json");
                var author = JsonSerializer.Deserialize<List<Author>>(authorData);

                foreach (var item in author)
                {
                    context.Author.Add(item);
                }

                await context.SaveChangesAsync();
            }
            // if (!context.Users.Any())
            // {
            //     var userData = File.ReadAllText("../Infrastructure/Data/SeedData/user.json");
            //     var usersDto = JsonSerializer.Deserialize<List<User>>(userData);

            //     foreach (var userDto in usersDto)
            //     {
            //         var user = new User
            //         {
            //             Id = userDto.Id,
            //             FirstName = userDto.FirstName,
            //             LastName = userDto.LastName,
            //             Email = userDto.Email,
            //             Password = userDto.Password,
            //             PhoneNumber = userDto.PhoneNumber,
            //             DateOfBirth = userDto.DateOfBirth.UtcDateTime, // Convert to UTC
            //             Role = userDto.Role
            //         };

            //         context.Users.Add(user);
            //     }

            //     await context.SaveChangesAsync();
            // }



            if (!context.Loan.Any())
            {
                var loanData = File.ReadAllText("../Infrastructure/Data/SeedData/loan.json");
                var loansDto = JsonSerializer.Deserialize<List<Loan>>(loanData);

                foreach (var loanDto in loansDto)
                {
                    var loan = new Loan
                    {
                        Id = loanDto.Id,
                        BorrowedDate=loanDto.BorrowedDate.UtcDateTime,
                        ReturnedDate = loanDto.ReturnedDate.UtcDateTime, // Convert to UTC
                        NumberOfBorrowedBooks=loanDto.NumberOfBorrowedBooks,
                        UserId = loanDto.UserId,
                        BookId=loanDto.BookId
                    };

                    context.Loan.Add(loan);
                }

                await context.SaveChangesAsync();
            }

              if (!context.AuthorBook.Any())
              {
                var authorBookData = File.ReadAllText("../Infrastructure/Data/SeedData/authorBook.json");
                var AuthorBooksDto = JsonSerializer.Deserialize<List<AuthorBook>>(authorBookData);

                foreach (var authorBookDto in AuthorBooksDto)
                {
                    var authorBook = new AuthorBook
                    {
                        BookId=authorBookDto.BookId,
                        AuthorId = authorBookDto.AuthorId
                    };

                    context.AuthorBook.Add(authorBook);
                }

                await context.SaveChangesAsync();
            }



            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();


        }
    }
}