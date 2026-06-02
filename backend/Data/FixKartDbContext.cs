using Microsoft.EntityFrameworkCore;
using FixKartApi.Models;

namespace FixKartApi.Data
{
    public class FixKartDbContext : DbContext
    {
        public FixKartDbContext(DbContextOptions<FixKartDbContext> options) : base(options)
        {
        }

        public DbSet<Worker> Workers { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Worker>().ToTable("Worker");
            modelBuilder.Entity<Booking>().ToTable("Booking");
        }
    }
}
