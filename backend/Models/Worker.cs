using System.ComponentModel.DataAnnotations;

namespace FixKartApi.Models
{
    public class Worker
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        public string AvatarUrl { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public decimal HourlyCharge { get; set; }
        public string Availability { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string ResponseRate { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public int ReviewsCount { get; set; }
        public int TrustScore { get; set; }

        public string SkillsJson { get; set; } = "[]";
        public string CertificationsJson { get; set; } = "[]";
        public string PortfolioJson { get; set; } = "[]";

        public string About { get; set; } = string.Empty;
        public string JoinedAt { get; set; } = DateTime.UtcNow.ToString("yyyy-MM-dd");

        public bool IsVerified { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }
}
