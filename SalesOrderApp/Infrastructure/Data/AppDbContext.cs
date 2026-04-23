using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderLine> SalesOrderLines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SalesOrder>().HasKey(s => s.OrderId);
            modelBuilder.Entity<SalesOrderLine>().HasKey(sl => sl.LineId);

            modelBuilder.Entity<Client>().HasData(
                new Client { ClientId = 1, CustomerName = "John Smith", Address1 = "123 Main St", Address2 = "Apt 4", Address3 = "", Suburb = "Colombo", State = "Western", PostCode = "10100" },
                new Client { ClientId = 2, CustomerName = "Sarah Johnson", Address1 = "456 Oak Ave", Address2 = "", Address3 = "", Suburb = "Kandy", State = "Central", PostCode = "20000" },
                new Client { ClientId = 3, CustomerName = "Mike Wilson", Address1 = "789 Pine Rd", Address2 = "Floor 2", Address3 = "", Suburb = "Galle", State = "Southern", PostCode = "80000" }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { ItemId = 1, ItemCode = "ITM001", Description = "Laptop Computer", Price = 150000 },
                new Item { ItemId = 2, ItemCode = "ITM002", Description = "Wireless Mouse", Price = 2500 },
                new Item { ItemId = 3, ItemCode = "ITM003", Description = "USB Keyboard", Price = 3500 },
                new Item { ItemId = 4, ItemCode = "ITM004", Description = "Monitor 24 inch", Price = 45000 },
                new Item { ItemId = 5, ItemCode = "ITM005", Description = "Office Chair", Price = 25000 }
            );
        }
    }
}