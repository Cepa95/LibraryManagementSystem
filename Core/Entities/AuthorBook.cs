using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class AuthorBook : BaseEntity
    {

        public required Book Book { get; set; }

        [Key]
        public int BookId { get; set; }

        public required Author Author { get; set; }
        
        [Key]
        public int AuthorId { get; set; }

    }
}
