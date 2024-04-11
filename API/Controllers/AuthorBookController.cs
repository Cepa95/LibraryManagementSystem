using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Specifications;
namespace API.Controllers
{
    public class AuthorBookController : BaseApiController
    {
        private readonly IAuthorBookRepository _repository;
        private readonly ILogger<AuthorBookController> _logger;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AuthorBookController(IAuthorBookRepository repository, ILogger<AuthorBookController> logger,
                              IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/AuthorBook
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<AuthorBook>>> GetAuthorBooks()
        {
            var authorBooks = await _repository.ListAllAsync();

            // return Ok(authorBooks);
            return Ok(_mapper.Map<IReadOnlyList<AuthorBook>, IReadOnlyList<AuthorBookDto>>(authorBooks));
        }


        //ne vraća dobro
        [HttpGet("{AuthorId}/{BookId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookDto>> GetAuthorBookByIdAsync(int AuthorId, int BookId)
        {
            _logger.LogInformation($"Getting author-book relationship for AuthorId: {AuthorId} and BookId: {BookId}");

            //var spec = new AuthorWithBookSpecification();
            var authorbook = await _repository.GetByIdAsync(BookId, AuthorId);

            if (authorbook == null) return NotFound(new ApiResponse(404, $"Author-book relationship for AuthorId: {AuthorId} and BookId: {BookId} not found"));

            var authorBookDto = new AuthorBookOneDto
            {
                BookId = authorbook.Book.Id,
                AuthorId = authorbook.Author.Id
            };

            return Ok(authorBookDto);

        }

        [HttpDelete("{AuthorId}/{BookId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAuthorBookAsync(int AuthorId, int BookId)
        {
            _logger.LogInformation($"Deleting author-book relathionship for AuthorId: {AuthorId} and BookId: {BookId}");

            var authorbook = await _repository.GetByIdAsync(BookId, AuthorId);

            if (authorbook == null) return NotFound(new ApiResponse(404, $"Author-book relationship for AuthorId: {AuthorId} and BookId: {BookId} not found"));

            _repository.Delete(authorbook);
            await _unitOfWork.Complete();

            //return NoContent();
            return Ok(new { message = $"Author-book relationship for AuthorId: {AuthorId} and BookId: {BookId} successfully deleted" });
        }


        //ne radi, triba promijenit ili maknit skroz
        // [HttpPut("{AuthorId}/{BookId}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<AuthorBookUpdateDto>> UpdateAuthorBookAsync(int AuthorId,int BookId, AuthorBookUpdateDto authorbookUpdateDto)
        // {
        //     _logger.LogInformation($"Updating author-book relathionship for AuthorId: {AuthorId} and BookId: {BookId}");

        //     var authorbook = await _repository.GetByIdAsync(BookId,AuthorId);

        //     if (authorbook == null) return NotFound(new ApiResponse(404, $"Author-book relationship for AuthorId: {AuthorId} and BookId: {BookId} not found"));

        //     _mapper.Map(authorbookUpdateDto, authorbook);

        //     _repository.Update(authorbook);
        //     await _unitOfWork.Complete();

        //     return Ok(_mapper.Map<AuthorBookUpdateDto>(authorbook));
        // }

        [HttpPost]
        public async Task<ActionResult<BookUpdateDto>> CreateBookAsync(AuthorBookUpdateDto authorbookCreateDto)
        {
            _logger.LogInformation("Creating a new author-book relathionship");

            var authorbook = _mapper.Map<AuthorBook>(authorbookCreateDto);

            _repository.Add(authorbook);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<AuthorBookUpdateDto>(authorbook));
        }

    }


}
