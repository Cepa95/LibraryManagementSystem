using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class UserController : BaseApiController
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserController(IGenericRepository<User> userRepository,
                              ILogger<UserController> logger,
                              IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _userRepository = userRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

           [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<UserDto>>> GetUsersAsync()
        {
            _logger.LogInformation("Getting all users");

           
            var users = await _userRepository.ListAllAsync();

            if (users == null) return NotFound(new ApiResponse(404, "Users are not found"));

            return Ok(_mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserDto>>(users));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDto>> GetUserByIdAsync(int id)
        {
            _logger.LogInformation($"Getting a user under id: {id}");

            var spec = new BaseSpecification<User>(a => a.Id == id);
            var user = await _userRepository.GetEntityWithSpec(spec);

            if (user == null) return NotFound(new ApiResponse(404, $"User under id: {id} is not found"));

            return Ok(_mapper.Map<User, UserDto>(user));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteUserAsync(int id)
        {
            _logger.LogInformation($"Deleting a user under id: {id}");

            var user = await _unitOfWork.Repository<User>().GetByIdAsync(id);

            if (user == null) return NotFound(new ApiResponse(404, $"User under id: {id} is not found"));

            _unitOfWork.Repository<User>().Delete(user);
            await _unitOfWork.Complete();

            //return NoContent();
            return Ok(new { message = $"User under id: {id} successfully deleted" });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDto>> UpdateUserAsync(int id, UserUpdateDto userUpdateDto)
        {
            _logger.LogInformation($"Updating a user under id: {id}");

            var user = await _unitOfWork.Repository<User>().GetByIdAsync(id);

            if (user == null) return NotFound(new ApiResponse(404, $"User under id: {id} is not found"));

            _mapper.Map(userUpdateDto, user);

            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<UserDto>(user));
        }
        // {

        // }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateAuthorAsync(UserDto userCreateDto)
        {
            _logger.LogInformation("Creating a new user");

            var user = _mapper.Map<User>(userCreateDto);

            _unitOfWork.Repository<User>().Add(user);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<UserDto>(user));
        }}
}