using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class AuthorController : BaseApiController
    {
        private readonly IGenericRepository<Author> _AuthorRepository;
        private readonly ILogger<AuthorController> _logger;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AuthorController(IGenericRepository<Author> AuthorRepository,
                              ILogger<AuthorController> logger,
                              IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _AuthorRepository = AuthorRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<AuthorDto>>> GetAuthorsAsync()
        {
            _logger.LogInformation("Getting all Authors");


            var authors = await _AuthorRepository.ListAllAsync();

            if (authors == null) return NotFound(new ApiResponse(404, "Authors are not found"));

            return Ok(_mapper.Map<IReadOnlyList<Author>, IReadOnlyList<AuthorDto>>(authors));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthorDto>> GetAuthorByIdAsync(int id)
        {
            _logger.LogInformation($"Getting a author under id: {id}");

            var spec = new BaseSpecification<Author>(a => a.Id == id);
            var author = await _AuthorRepository.GetEntityWithSpec(spec);

            if (author == null) return NotFound(new ApiResponse(404, $"Author under id: {id} is not found"));

            return Ok(_mapper.Map<Author, AuthorDto>(author));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAuthorAsync(int id)
        {
            _logger.LogInformation($"Deleting a author under id: {id}");

            var author = await _unitOfWork.Repository<Author>().GetByIdAsync(id);

            if (author == null) return NotFound(new ApiResponse(404, $"Author under id: {id} is not found"));

            _unitOfWork.Repository<Author>().Delete(author);
            await _unitOfWork.Complete();

            //return NoContent();
            return Ok(new { message = $"Author under id: {id} successfully deleted" });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthorDto>> UpdateAuthorAsync(int id, AuthorUpdateDto authorUpdateDto)
        {
            _logger.LogInformation($"Updating a author under id: {id}");

            var author = await _unitOfWork.Repository<Author>().GetByIdAsync(id);

            if (author == null) return NotFound(new ApiResponse(404, $"Author under id: {id} is not found"));

            _mapper.Map(authorUpdateDto, author);

            _unitOfWork.Repository<Author>().Update(author);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<AuthorDto>(author));
        }
        // {

        // }

        [HttpPost]
        public async Task<ActionResult<AuthorDto>> CreateAuthorAsync(AuthorDto authorCreateDto)
        {
            _logger.LogInformation("Creating a new user");

            var author = _mapper.Map<Author>(authorCreateDto);

            _unitOfWork.Repository<Author>().Add(author);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<AuthorDto>(author));
        }
    }
}