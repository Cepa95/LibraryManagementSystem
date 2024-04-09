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

            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<Publisher, PublisherDto>().ReverseMap();
        }

    }
}