using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.config
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Title).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(600);
            builder.Property(p => p.SearchCriteria).IsRequired().HasMaxLength(200);
            builder.Property(p => p.Pages).IsRequired();
            builder.Property(p => p.ImageUrl).IsRequired();
            builder.Property(p => p.NumberOfCopies).IsRequired().HasDefaultValue(0);
            builder.HasOne(p => p.Publisher).WithMany().HasForeignKey(p => p.PublisherId);
            builder.HasOne(c => c.Category).WithMany().HasForeignKey(c => c.CategoryId);
        }
    }
    
}