using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorBookController : BaseApiController
    {
        private readonly IGenericRepository<Book> _AuthorBookRepository;
      
        public AuthorBookController(IGenericRepository<Book> AuthorBookRepository)
        {
            _AuthorBookRepository = AuthorBookRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AuthorBook>>>Async()
        {
            var spec = new BookWithCategoryAndPublisherSpecification();
            var AuthorBooks = await _AuthorBookRepository.ListAsync(spec);
            return Ok(AuthorBooks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetAuthorBooksByIdAsync(int id)
        {
            var spec = new BookWithCategoryAndPublisherSpecification(id);
            var AuthorBook = await _AuthorBookRepository.GetEntityWithSpec(spec);
            if (AuthorBook == null) return NotFound(); //posli cu dodati i custom error message
            return Ok(AuthorBook);
        }

    }
}