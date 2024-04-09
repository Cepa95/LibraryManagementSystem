using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class CategoryController : BaseApiController
    {
        private readonly IGenericRepository<Category> _categoryRepository;
        public CategoryController(IGenericRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var spec = new CategorySpecification();

            var categories = await _categoryRepository.ListAsync(spec);

            return Ok(categories);
        }


    }
}