using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISalesOrderRepository
    {
        Task<IEnumerable<SalesOrder>> GetAllAsync();
        Task<SalesOrder> GetByIdAsync(int id);
        Task<SalesOrder> CreateAsync(SalesOrder order);
        Task<SalesOrder> UpdateAsync(SalesOrder order);
        Task<bool> DeleteAsync(int id);
    }
}