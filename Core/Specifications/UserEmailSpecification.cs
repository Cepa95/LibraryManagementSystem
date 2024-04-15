using Core.Entities;

namespace Core.Specifications
{
    public class UserEmailSpecification  : BaseSpecification<User>
    {
        public UserEmailSpecification (string email) : base(u => u.Email == email)
        {
        }
    }
}