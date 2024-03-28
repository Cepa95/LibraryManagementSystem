using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.config
{
    public class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {
        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.BorrowedDate).IsRequired();
            builder.Property(p => p.ReturnedDate).IsRequired(false);
            builder.Property(p => p.NumberOfBorrowedBooks).IsRequired();
            builder.HasOne(u => u.User).WithMany().HasForeignKey(p => p.UserId);
            builder.HasOne(b => b.Book).WithMany().HasForeignKey(p => p.BookId);
        }
    }
    
}