using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class CategoryController : BaseApiController
    {
        private readonly LibraryContext _context;
        public CategoryController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var products = await _context.Category.ToListAsync();

            return Ok(products);
        }

       
    }
}