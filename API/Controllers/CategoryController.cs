using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class CategoryController : BaseApiController
    {
        private readonly IGenericRepository<Category> _categoryRepository;

        private readonly ILogger<CategoryController> _logger;

        private readonly IMapper _mapper;

        public CategoryController(IGenericRepository<Category> categoryRepository, 
                                  IMapper mapper,
                                  ILogger<CategoryController> logger)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories()
        {
            _logger.LogInformation("Getting all categories");

            var spec = new CategorySpecification();

            var categories = await _categoryRepository.ListAsync(spec);

            var categoryDtos = _mapper.Map<IReadOnlyList<CategoryDto>>(categories); 

            return Ok(categoryDtos);
        }


    }
}