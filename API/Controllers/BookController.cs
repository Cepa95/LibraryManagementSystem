using API.Dtos;
using API.Errors;
using API.Helpers;
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
        private readonly IUnitOfWork _unitOfWork;

        public BookController(IGenericRepository<Book> bookRepository,
                              ILogger<BookController> logger,
                              IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _bookRepository = bookRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pagination<BookDto>>> GetBooksAsync(
            [FromQuery] BookParams bookparams)
        {
            _logger.LogInformation("Getting all books");

            var spec = new BookWithCategoryAndPublisherSpecification(bookparams);

            var countSpec = new BookWithFiltersCountSpecification(bookparams);

            var totalItems = await _bookRepository.CountAsync(countSpec);

             var books = await _bookRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Book>, IReadOnlyList<BookDto>>(books);
           

            return Ok(new Pagination<BookDto>(bookparams.PageIndex, bookparams.PageSize, totalItems, data));
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

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteBookAsync(int id)
        {
            _logger.LogInformation($"Deleting a book under id: {id}");

            var book = await _unitOfWork.Repository<Book>().GetByIdAsync(id);

            if (book == null) return NotFound(new ApiResponse(404, $"Book under id: {id} is not found"));

            _unitOfWork.Repository<Book>().Delete(book);
            await _unitOfWork.Complete();

            //return NoContent();
            return Ok(new { message = $"Book under id: {id} successfully deleted" });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookUpdateDto>> UpdateBookAsync(int id, BookUpdateDto bookUpdateDto)
        {
            _logger.LogInformation($"Updating a book under id: {id}");

            var book = await _unitOfWork.Repository<Book>().GetByIdAsync(id);

            if (book == null) return NotFound(new ApiResponse(404, $"Book under id: {id} is not found"));

            _mapper.Map(bookUpdateDto, book);

            _unitOfWork.Repository<Book>().Update(book);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<BookUpdateDto>(book));
        }
        // {
        //     "Title": "Updated Book Title",
        //     "Description": "Updated Description",
        //     "Pages": 300,
        //     "ImageUrl": "http://example.com/updated-image.jpg",
        //     "NumberOfCopies": 10,
        //     "PublisherId": 1,
        //     "CategoryId": 1
        // }

        [HttpPost]
        public async Task<ActionResult<BookUpdateDto>> CreateBookAsync(BookUpdateDto bookCreateDto)
        {
            _logger.LogInformation("Creating a new book");

            var book = _mapper.Map<Book>(bookCreateDto);

            _unitOfWork.Repository<Book>().Add(book);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<BookUpdateDto>(book));
        }
        // {
        //     "Title": "New Book Title",
        //     "Description": "New Book Description",
        //     "Pages": 200,
        //     "ImageUrl": "http://example.com/new-book-image.jpg",
        //     "NumberOfCopies": 5,
        //     "PublisherId": 1,
        //     "CategoryId": 1
        // }


    }
}