
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class AuthorBookRepository : IAuthorBookRepository
    {
        private readonly LibraryContext _context;

        public AuthorBookRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<AuthorBook> GetByIdAsync(int bookId, int authorId)
        {
            return await _context.AuthorBook.FindAsync(bookId, authorId);
        }

        public async Task<IReadOnlyList<AuthorBook>> ListAllAsync()
        {
            return await _context.AuthorBook.Include(ab => ab.Book).Include(ab => ab.Author).ToListAsync();
        }

        public AuthorBook Add(AuthorBook entity)
        {
            _context.AuthorBook.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Update(AuthorBook entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(AuthorBook entity)
        {
            _context.AuthorBook.Remove(entity);
            _context.SaveChanges();
        }
    }
}