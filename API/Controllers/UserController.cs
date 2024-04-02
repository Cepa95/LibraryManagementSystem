using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class UserController : BaseApiController
    {
        private readonly LibraryContext _context;
        public UserController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetUsers()
        {
            var products = await _context.Users.ToListAsync();

            return Ok(products);
        }

       
    }
}