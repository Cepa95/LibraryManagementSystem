using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorController : BaseApiController
    {
        private readonly IGenericRepository<Publisher> _AuthorRepository;
      
        public AuthorController(IGenericRepository<Publisher> AuthorRepository)
        {
            _AuthorRepository = AuthorRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Publisher>>> GetPublishersAsync()
        {

            return Ok(await _AuthorRepository.ListAllAsync());
        }

       

    }
}