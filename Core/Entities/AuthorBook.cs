using System.ComponentModel.DataAnnotations;
using Core.Interfaces;

namespace Core.Entities
{
    public class AuthorBook 
    {

        public Book Book { get; set; }

        [Key]
        public int BookId { get; set; }

        public Author Author { get; set; }
        
        [Key]
        public int AuthorId { get; set; }

    }
}
