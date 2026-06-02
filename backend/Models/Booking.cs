using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FixKartApi.Models
{
    public class Booking
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string CustomerId { get; set; } = string.Empty;
        
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public string WorkerId { get; set; } = string.Empty;
        
        [ForeignKey("WorkerId")]
        public Worker? Worker { get; set; }
        
        public string Category { get; set; } = string.Empty;
        
        public DateTime BookingTime { get; set; } = DateTime.UtcNow;
        public DateTime? ScheduledTime { get; set; }
        
        public decimal BaseRate { get; set; }
        
        // Status: Pending, Accepted, Dispatched, InProgress, Completed, Cancelled, Disputed
        public string Status { get; set; } = "Pending"; 
        
        public string SecurityPin { get; set; } = new Random().Next(1000, 9999).ToString();
        
        public bool EscrowLocked { get; set; } = false;
    }
}
