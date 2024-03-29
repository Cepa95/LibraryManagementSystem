using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PublisherController : BaseApiController
    {
        private readonly IGenericRepository<Publisher> _publisherRepository;
      
        public PublisherController(IGenericRepository<Publisher> publisherRepository)
        {
            _publisherRepository = publisherRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Publisher>>> GetPublishersAsync()
        {

            return Ok(await _publisherRepository.ListAllAsync());
        }

       

    }
}