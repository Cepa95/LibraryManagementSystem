using System.Globalization;
using System.Text.Json;
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
    [Route("api/account")]
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

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserDto>> LoginAsync([FromBody] LoginDto loginDto)
        {
            _logger.LogInformation($"Logging in user with email: {loginDto.Email}");

            // Find user by email
            var user = await _userRepository.GetEntityWithSpec(new UserEmailSpecification(loginDto.Email));

            // Check if user exists
            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "Invalid email or password."));
            }

            // Validate password
            if (user.Password != loginDto.Password)
            {
                return Unauthorized(new ApiResponse(401, "Invalid email or password."));
            }

            // User authenticated successfully
            return Ok(_mapper.Map<UserDto>(user));
        }
        [HttpGet("check-email-existence")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> CheckEmailExistenceAsync([FromQuery] string email)
        {
            try
            {
                _logger.LogInformation($"Checking existence of email: {email}");

                // Check if the email already exists
                var existingUser = await _userRepository.GetEntityWithSpec(new UserEmailSpecification(email));
                if (existingUser != null)
                {
                    // Email address already exists
                    return Ok(true);
                }
                else
                {
                    // Email address does not exist
                    return Ok(false);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error checking email existence: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new ApiResponse(500, "Internal server error."));
            }
        }

        [HttpPost("register")]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
public async Task<ActionResult<UserDto>> RegisterAsync([FromBody] RegistrationDto registrationDto)
{
    _logger.LogInformation("Registering new user.");

    // Check if the email already exists
    var existingUser = await _userRepository.GetEntityWithSpec(new UserEmailSpecification(registrationDto.Email));
    if (existingUser != null)
    {
        return BadRequest(new ApiResponse(400, "Email address already exists."));
    }

    // Convert the string representation of DateOfBirth to a DateTimeOffset object
    if (!DateTime.TryParseExact(registrationDto.DateOfBirth.ToString("yyyy-MM-dd"), "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime newDateTime) ||
        newDateTime.Year < 0 || newDateTime.Year > 10000)
    {
        return BadRequest(new ApiResponse(400, "Invalid date format for DateOfBirth or out of range."));
    }

    // Log date values before assignment
    _logger.LogInformation($"Date of birth before formatting: {registrationDto.DateOfBirth}");
    _logger.LogInformation($"Date of birth after formatting: {newDateTime}");

    var newUser = _mapper.Map<User>(registrationDto);

    // Convert DateOfBirth to UTC before saving
    newUser.DateOfBirth = newDateTime.ToUniversalTime();

    _unitOfWork.Repository<User>().Add(newUser);
    await _unitOfWork.Complete();
    
    // Return the newly created user
    return CreatedAtAction(nameof(GetUserByIdAsync), new { id = newUser.Id }, _mapper.Map<UserDto>(newUser));
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

            if (user == null)
            {
                return NotFound(new ApiResponse(404, $"User under id: {id} is not found"));
            }

            _mapper.Map(userUpdateDto, user);

            // Convert DateTimeOffset properties to UTC
            user.DateOfBirth = user.DateOfBirth.ToUniversalTime();

            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<UserDto>(user));
        }
        // {

        // }



        // Helper method to validate DateOfBirth format
        private bool IsValidDateOfBirth(string dateOfBirth)
        {
            DateTimeOffset result;
            return DateTimeOffset.TryParse(dateOfBirth, out result);
        }

    }
}