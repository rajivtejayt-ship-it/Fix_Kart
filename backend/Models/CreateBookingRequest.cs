namespace FixKartApi.Models
{
    public class CreateBookingRequest
    {
        public string WorkerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? ScheduledTime { get; set; }
    }
}
