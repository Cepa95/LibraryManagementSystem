using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class AuthorBook : BaseEntity
    {

        public Book Book { get; set; }

        [Key]
        public int BookId { get; set; }

        public Author Author { get; set; }
        
        [Key]
        public int AuthorId { get; set; }

    }
}
