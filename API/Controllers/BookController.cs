using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly IGenericRepository<Book> _bookRepository;

        private readonly ILogger<BookController> _logger;
      
        public BookController(IGenericRepository<Book> bookRepository, ILogger<BookController> logger)
        {
            _bookRepository = bookRepository;
            _logger = logger;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Book>>> GetBooksAsync()
        {
            _logger.LogInformation("Getting all books");
            
            var spec = new BookWithCategoryAndPublisherSpecification();
            var books = await _bookRepository.ListAsync(spec);
            if (books == null) return NotFound(new ApiResponse(404, "Books are not found"));
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookByIdAsync(int id)
        {
             _logger.LogInformation($"Getting a book under id: {id}");
            var spec = new BookWithCategoryAndPublisherSpecification(id);
            var book = await _bookRepository.GetEntityWithSpec(spec);
            if (book == null) return NotFound(new ApiResponse(404, $"Book under id: {id} is not found")); 
            return Ok(book);
        }

    }
}