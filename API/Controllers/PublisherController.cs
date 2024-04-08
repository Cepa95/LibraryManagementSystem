using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PublisherController : BaseApiController
    {
        private readonly IGenericRepository<Publisher> _publisherRepository;

        private readonly ILogger<PublisherController> _logger;
      
        public PublisherController(IGenericRepository<Publisher> publisherRepository, 
                                   ILogger<PublisherController> logger)
        {
            _publisherRepository = publisherRepository;
            _logger = logger;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Publisher>>> GetPublishersAsync()
        {
            _logger.LogInformation("Getting all publishers");

            return Ok(await _publisherRepository.ListAllAsync());
        }

       

    }
}