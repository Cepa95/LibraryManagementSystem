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
                context.Book.AddRange(books);

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


            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();


        }
    }
}