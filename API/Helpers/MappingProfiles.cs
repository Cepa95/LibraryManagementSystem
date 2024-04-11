using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, BookDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
                .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.Name));

            CreateMap<BookUpdateDto, Book>().ReverseMap();

            CreateMap<AuthorDto,Author>().ReverseMap();

            CreateMap<AuthorUpdateDto,Author>().ReverseMap();
                
            CreateMap<UserDto,User>().ReverseMap();

            CreateMap<UserUpdateDto,User>().ReverseMap();


             CreateMap<Loan, LoanDto>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.User.Id))//
                .ForMember(d => d.Book, o => o.MapFrom(s => s.Book.Title));

             CreateMap<LoanUpdateDto, Loan>().ReverseMap();

              CreateMap<LoanUpdateDto, Loan>()
                .ForMember(dest => dest.User, opt => opt.Ignore()) // Ignore User property during mapping
                .ForMember(dest => dest.Book, opt => opt.Ignore()); // Ignore Book property during mapping

            CreateMap<AuthorBook, AuthorBookDto>()
                .ForMember(d => d.BookId, o => o.MapFrom(s => s.Book.Id))
                .ForMember(d => d.AuthorId, o => o.MapFrom(s => s.Author.Id));

            CreateMap<AuthorBook, AuthorBookOneDto>()
                .ForMember(d => d.BookId, o => o.MapFrom(s => s.Book))
                .ForMember(d => d.AuthorId, o => o.MapFrom(s => s.Author));

            CreateMap<AuthorBookUpdateDto, AuthorBook>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<Publisher, PublisherDto>().ReverseMap();

        }

    }
}