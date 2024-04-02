using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;

namespace API.Controllers
{

    public class AuthorBookController : BaseApiController
    {
        private readonly IAuthorBookRepository _repository;

        public AuthorBookController(IAuthorBookRepository repository)
        {
            _repository = repository;
        }

        // GET: api/AuthorBook
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AuthorBook>>> GetAuthorBooks()
        {
            var authorBooks = await _repository.ListAllAsync();

            return Ok(authorBooks);
        }


    }
}