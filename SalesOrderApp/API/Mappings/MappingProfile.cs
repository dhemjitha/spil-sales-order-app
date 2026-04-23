using AutoMapper;
using API.Models;
using Domain.Entities;

namespace API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Client, ClientDto>();
            CreateMap<Item, ItemDto>();

            CreateMap<SalesOrderLine, SalesOrderLineDto>()
                .ForMember(dest => dest.ItemCode, opt => opt.MapFrom(src => src.Item.ItemCode))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Item.Description));

            CreateMap<SalesOrder, SalesOrderDto>()
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Client.CustomerName))
                .ForMember(dest => dest.OrderLines, opt => opt.MapFrom(src => src.OrderLines));

            CreateMap<CreateSalesOrderDto, SalesOrder>();
            CreateMap<CreateSalesOrderLineDto, SalesOrderLine>();
        }
    }
}