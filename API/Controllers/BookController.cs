using API.Dtos;
using API.Errors;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public BookController(IGenericRepository<Book> bookRepository,
                              ILogger<BookController> logger,
                              IMapper mapper)
        {
            _bookRepository = bookRepository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<BookDto>>> GetBooksAsync()
        {
            _logger.LogInformation("Getting all books");

            var spec = new BookWithCategoryAndPublisherSpecification();
            var books = await _bookRepository.ListAsync(spec);

            if (books == null) return NotFound(new ApiResponse(404, "Books are not found"));

            return Ok(_mapper.Map<IReadOnlyList<Book>, IReadOnlyList<BookDto>>(books));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookDto>> GetBookByIdAsync(int id)
        {
            _logger.LogInformation($"Getting a book under id: {id}");

            var spec = new BookWithCategoryAndPublisherSpecification(id);
            var book = await _bookRepository.GetEntityWithSpec(spec);

            if (book == null) return NotFound(new ApiResponse(404, $"Book under id: {id} is not found"));

            return Ok(_mapper.Map<Book, BookDto>(book));
        }

    }
}