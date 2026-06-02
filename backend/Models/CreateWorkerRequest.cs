namespace FixKartApi.Models
{
    public class CreateWorkerRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Experience { get; set; } = "0 Years";
        public string Charge { get; set; } = "₹0";
        public string Availability { get; set; } = "To be confirmed";
        public string Location { get; set; } = string.Empty;
        public string? About { get; set; }
        public string? Avatar { get; set; }
        public List<string>? Skills { get; set; }
        public List<string>? Certifications { get; set; }
    }
}
