using Core.Entitites;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
