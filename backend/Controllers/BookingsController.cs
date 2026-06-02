using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FixKartApi.Data;
using FixKartApi.Models;

namespace FixKartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly FixKartDbContext _context;

        public BookingsController(FixKartDbContext context)
        {
            _context = context;
        }

        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<object>> CreateBooking([FromBody] CreateBookingRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.WorkerId) ||
                string.IsNullOrWhiteSpace(request.CustomerName) ||
                string.IsNullOrWhiteSpace(request.CustomerPhone) ||
                string.IsNullOrWhiteSpace(request.Location))
            {
                return BadRequest(new { error = "workerId, customerName, customerPhone, and location are required." });
            }

            var worker = await _context.Workers.FindAsync(request.WorkerId);
            if (worker == null || !worker.IsVerified || !worker.IsActive)
            {
                return BadRequest(new { error = "Worker not found or not yet verified." });
            }

            DateTime? scheduled = null;
            if (!string.IsNullOrWhiteSpace(request.ScheduledTime) &&
                DateTime.TryParse(request.ScheduledTime, out var parsed))
            {
                scheduled = parsed;
            }

            var booking = new Booking
            {
                Id = $"booking-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}",
                CustomerId = "fk-guest",
                CustomerName = request.CustomerName,
                CustomerPhone = request.CustomerPhone,
                Location = request.Location,
                Description = request.Description ?? "",
                WorkerId = request.WorkerId,
                Category = string.IsNullOrWhiteSpace(request.Category) ? worker.Category : request.Category,
                BookingTime = DateTime.UtcNow,
                ScheduledTime = scheduled,
                BaseRate = worker.HourlyCharge,
                Status = "Pending",
                SecurityPin = new Random().Next(1000, 9999).ToString(),
                EscrowLocked = true,
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, new
            {
                id = booking.Id,
                workerId = booking.WorkerId,
                workerName = worker.Name,
                category = booking.Category,
                customerName = booking.CustomerName,
                customerPhone = booking.CustomerPhone,
                location = booking.Location,
                description = booking.Description,
                scheduledTime = booking.ScheduledTime?.ToString("o"),
                status = booking.Status,
                securityPin = booking.SecurityPin,
                createdAt = booking.BookingTime.ToString("o"),
            });
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(string id)
        {
            var booking = await _context.Bookings.Include(b => b.Worker).FirstOrDefaultAsync(b => b.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // POST: api/Bookings/{id}/release
        [HttpPost("{id}/release")]
        public async Task<IActionResult> ReleaseEscrow(string id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            booking.Status = "Completed";
            booking.EscrowLocked = false;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Escrow funds released." });
        }
    }
}
