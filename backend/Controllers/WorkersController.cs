using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FixKartApi.Data;
using FixKartApi.Models;

namespace FixKartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly FixKartDbContext _context;

        public WorkersController(FixKartDbContext context)
        {
            _context = context;
        }

        // GET: api/Workers?category=&location=&verifiedOnly=true
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Worker>>> GetWorkers(
            [FromQuery] string? category,
            [FromQuery] string? location,
            [FromQuery] bool verifiedOnly = false)
        {
            var query = _context.Workers.Where(w => w.IsActive);

            if (verifiedOnly)
            {
                query = query.Where(w => w.IsVerified);
            }

            if (!string.IsNullOrEmpty(category) && !category.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(w => w.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrEmpty(location) && !location.Equals("All Locations", StringComparison.OrdinalIgnoreCase))
            {
                var area = location.Split(',')[0].Trim().ToLower();
                query = query.Where(w => w.Location.ToLower().Contains(area));
            }

            return await query.ToListAsync();
        }

        // GET: api/Workers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Worker>> GetWorker(string id)
        {
            var worker = await _context.Workers.FindAsync(id);

            if (worker == null || !worker.IsActive || !worker.IsVerified)
            {
                return NotFound();
            }

            return worker;
        }

        // POST: api/Workers
        [HttpPost]
        public async Task<ActionResult<Worker>> CreateWorker([FromBody] CreateWorkerRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) ||
                string.IsNullOrWhiteSpace(request.Category) ||
                string.IsNullOrWhiteSpace(request.Location))
            {
                return BadRequest(new { error = "name, category, and location are required." });
            }

            var charge = ParseCharge(request.Charge);

            var worker = new Worker
            {
                Id = $"worker-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}",
                Name = request.Name,
                Category = request.Category.ToLower(),
                Experience = request.Experience,
                HourlyCharge = charge,
                Availability = request.Availability,
                Location = request.Location,
                ResponseRate = "New on Platform",
                Rating = 0,
                ReviewsCount = 0,
                TrustScore = 0,
                SkillsJson = JsonSerializer.Serialize(request.Skills ?? new List<string>()),
                CertificationsJson = JsonSerializer.Serialize(request.Certifications ?? new List<string>()),
                PortfolioJson = "[]",
                About = request.About ?? "",
                AvatarUrl = request.Avatar ?? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
                JoinedAt = DateTime.UtcNow.ToString("yyyy-MM-dd"),
                IsVerified = false,
                IsActive = true,
            };

            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorker), new { id = worker.Id }, worker);
        }

        private static decimal ParseCharge(string charge)
        {
            var digits = Regex.Replace(charge ?? "", @"[^\d]", "");
            return decimal.TryParse(digits, out var value) ? value : 0;
        }
    }
}
