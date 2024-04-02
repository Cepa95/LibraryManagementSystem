using Core.Entities;

namespace Core.Interfaces
{
    public interface IAuthorBookRepository
    {
        Task<AuthorBook> GetByIdAsync(int bookId, int authorId);
        Task<IReadOnlyList<AuthorBook>> ListAllAsync();
        AuthorBook Add(AuthorBook entity);
        void Update(AuthorBook entity);
        void Delete(AuthorBook entity);
    }
}