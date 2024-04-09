using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PublisherController : BaseApiController
    {
        private readonly IGenericRepository<Publisher> _publisherRepository;
        private readonly ILogger<PublisherController> _logger;

        private readonly IMapper _mapper;

        public PublisherController(IGenericRepository<Publisher> publisherRepository,
                                   ILogger<PublisherController> logger,
                                   IMapper mapper)
        {
            _publisherRepository = publisherRepository;
            _logger = logger;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<PublisherDto>>> GetCategories()
        {
            _logger.LogInformation("Getting all publishers");

            var spec = new PublisherSpecification();

            var categories = await _publisherRepository.ListAsync(spec);

            var categoryDtos = _mapper.Map<IReadOnlyList<PublisherDto>>(categories);

            return Ok(categoryDtos);
        }



    }
}