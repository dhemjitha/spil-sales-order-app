using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SalesOrderRepository : ISalesOrderRepository
    {
        private readonly AppDbContext _context;

        public SalesOrderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SalesOrder>> GetAllAsync()
        {
            return await _context.SalesOrders
                .Include(o => o.Client)
                .Include(o => o.OrderLines)
                .ThenInclude(l => l.Item)
                .ToListAsync();
        }

        public async Task<SalesOrder> GetByIdAsync(int id)
        {
            return await _context.SalesOrders
                .Include(o => o.Client)
                .Include(o => o.OrderLines)
                .ThenInclude(l => l.Item)
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task<SalesOrder> CreateAsync(SalesOrder order)
        {
            order.CreatedAt = DateTime.UtcNow;
            _context.SalesOrders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<SalesOrder> UpdateAsync(SalesOrder order)
        {
            _context.SalesOrders.Update(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var order = await _context.SalesOrders
                .Include(o => o.OrderLines)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null) return false;

            _context.SalesOrderLines.RemoveRange(order.OrderLines);
            _context.SalesOrders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}