using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorBookController : BaseApiController
    {
        private readonly IGenericRepository<AuthorBook> _AuthorBookRepository;
      
        public AuthorBookController(IGenericRepository<AuthorBook> AuthorBookRepository)
        {
            _AuthorBookRepository = AuthorBookRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AuthorBook>>>ListAllAsync()
        {
            var spec = new AuthorWithBookSpecification();
            var AuthorBooks = await _AuthorBookRepository.ListAsync(spec);
            return Ok(AuthorBooks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorBook>> GetAuthorBooksByIdAsync(int id)
        {
            var spec = new AuthorWithBookSpecification(id);
            var AuthorBook = await _AuthorBookRepository.GetEntityWithSpec(spec);
            if (AuthorBook == null) return NotFound(); //posli cu dodati i custom error message
            return Ok(AuthorBook);
        }

    }
}