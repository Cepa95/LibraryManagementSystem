using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Dtos;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{
    public class LoanController : BaseApiController
    {
        private readonly IGenericRepository<Loan> _loanRepository;
        private readonly ILogger<LoanController> _logger;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;


        public LoanController(IGenericRepository<Loan> loanRepository,
                              ILogger<LoanController> logger,
                              IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _loanRepository = loanRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
              
        }
      
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
         public async Task<ActionResult<IReadOnlyList<LoanDto>>> GetLoansAsync()
        {
            _logger.LogInformation("Getting all loans");

            var spec = new LoanSpecification();
            var loans = await _loanRepository.ListAsync(spec);

            if (loans == null) return NotFound(new ApiResponse(404, "Loans are not found"));

            return Ok(_mapper.Map<IReadOnlyList<Loan>, IReadOnlyList<LoanDto>>(loans));
        }
   
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Loan>> GetLoansByIdAsync(int id)
        {
             _logger.LogInformation($"Getting a loan under id: {id}");

            var spec = new LoanSpecification(id);
            var loan = await _loanRepository.GetEntityWithSpec(spec);

            if (loan == null) return NotFound(new ApiResponse(404, $"Loan under id: {id} is not found"));

            return Ok(_mapper.Map<Loan, LoanDto>(loan));
        }

         [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteLoanAsync(int id)
        {
            _logger.LogInformation($"Deleting a loan under id: {id}");

            var loan = await _unitOfWork.Repository<Loan>().GetByIdAsync(id);

            if (loan == null) return NotFound(new ApiResponse(404, $"Loan under id: {id} is not found"));

            _unitOfWork.Repository<Loan>().Delete(loan);
            await _unitOfWork.Complete();

            //return NoContent();
            return Ok(new { message = $"Loan under id: {id} successfully deleted" });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LoanUpdateDto>> UpdateLoanAsync(int id, LoanUpdateDto loanUpdateDto)
        {
            _logger.LogInformation($"Updating a loan under id: {id}");

            var loan = await _unitOfWork.Repository<Loan>().GetByIdAsync(id);

            if (loan == null) return NotFound(new ApiResponse(404, $"Loan under id: {id} is not found"));

            _mapper.Map(loanUpdateDto, loan);

            _unitOfWork.Repository<Loan>().Update(loan);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<LoanUpdateDto>(loan));
        }
       

        [HttpPost]
        public async Task<ActionResult<LoanUpdateDto>> CreateLoanAsync(LoanUpdateDto loanCreateDto)
        {
            _logger.LogInformation("Creating a new loan");
            var borrowedDate = DateTimeOffset.UtcNow;
            var returnedDate = borrowedDate.AddDays(14).UtcDateTime;

            var loan = _mapper.Map<Loan>(loanCreateDto);

            loan.BorrowedDate = borrowedDate;
            loan.ReturnedDate = returnedDate;

            _unitOfWork.Repository<Loan>().Add(loan);
            await _unitOfWork.Complete();

            return Ok(_mapper.Map<LoanUpdateDto>(loan));
        }
      
    }
}