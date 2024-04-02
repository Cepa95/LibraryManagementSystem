using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LoanController : BaseApiController
    {
        private readonly IGenericRepository<Loan> _LoanRepository;
      
       
        public LoanController(IGenericRepository<Loan> LoanRepository)
        {
            _LoanRepository = LoanRepository;
              
        }
      
        

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Loan>>>ListAllAsync()
        {
            var spec = new LoanSpecification();
            var loan = await _LoanRepository.ListAsync(spec);
            return Ok(loan);
        }
   
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoansByIdAsync(int id)
        {
            var spec = new LoanSpecification(id);
            var Loan = await _LoanRepository.GetEntityWithSpec(spec);
            if (Loan == null) return NotFound(); //posli cu dodati i custom error message
            return Ok(Loan);
        }

    }
}