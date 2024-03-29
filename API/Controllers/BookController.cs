using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly IGenericRepository<Book> _bookRepository;
      
        public BookController(IGenericRepository<Book> bookRepository)
        {
            _bookRepository = bookRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Book>>> GetBooksAsync()
        {
            var spec = new BookWithCategoryAndPublisherSpecification();
            var books = await _bookRepository.ListAsync(spec);
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookByIdAsync(int id)
        {
            var spec = new BookWithCategoryAndPublisherSpecification();
            var book = await _bookRepository.GetEntityWithSpec(spec);
            if (book == null) return NotFound(); //posli cu dodati i custom error message
            return Ok(book);
        }

    }
}