using FixKartApi.Models;
using System.Text.Json;

namespace FixKartApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(FixKartDbContext context)
        {
            // Remove early return to allow merging new workers in the future
            // if (context.Workers.Any())
            // {
            //     return;   // DB has been seeded
            // }

            var workers = new Worker[]
            {
                new Worker
                {
                    Id = "elec-1",
                    Name = "Rajesh Kumar",
                    Category = "electrician",
                    AvatarUrl = "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80",
                    Experience = "8 Years",
                    HourlyCharge = 299.00M,
                    Availability = "Today, 9 AM - 6 PM",
                    Location = "Indiranagar, Bangalore",
                    ResponseRate = "98% (under 12 mins)",
                    Rating = 4.9M,
                    ReviewsCount = 184,
                    TrustScore = 98,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Appliance Wiring", "Short Circuit Repair", "Smart Home Automation Setup", "Distribution Board Overhauls" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "State Electricity Board License A", "ISO Wiring Safety Assured" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1558223180-113b85368a53?w=150&auto=format&fit=crop&q=80" }),
                    About = "Specialized in high-risk residential electrical repairs and modern smart home configurations. Known for ultra-punctuality and strict adherence to IS-732 safety codes.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "elec-2",
                    Name = "Sunita Rao",
                    Category = "electrician",
                    AvatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
                    Experience = "5 Years",
                    HourlyCharge = 249.00M,
                    Availability = "Mon - Sat, 10 AM - 5 PM",
                    Location = "Koramangala, Bangalore",
                    ResponseRate = "95% (under 15 mins)",
                    Rating = 4.8M,
                    ReviewsCount = 112,
                    TrustScore = 94,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Inverter Backups", "Ceiling Fan Repair", "Commercial Lighting Systems", "Phase Fault Rectification" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "National Skill Development Council (NSDC) Level-4 Certified" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=150&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&auto=format&fit=crop&q=80" }),
                    About = "Experienced electrical engineer focusing on eco-friendly power backups, complex multi-phase lighting matrices, and rapid domestic fault detections.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "plumb-1",
                    Name = "Amit Sharma",
                    Category = "plumber",
                    AvatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
                    Experience = "12 Years",
                    HourlyCharge = 349.00M,
                    Availability = "Emergency Only, 24/7",
                    Location = "Whitefield, Bangalore",
                    ResponseRate = "99% (under 9 mins)",
                    Rating = 4.95M,
                    ReviewsCount = 310,
                    TrustScore = 99,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Hydro-Jetting", "CCTV Pipe Inspections", "Leakage Sonar Audits", "Bathroom Fitting Installation" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "Indian Plumbing Association Elite Practitioner Badge", "Advanced Pipeline Welder License" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?w=150&auto=format&fit=crop&q=80" }),
                    About = "Veteran technician specializing in emergency heavy-duty drain cleaning, zero-damage water leak tracing, and premium European sanitary installations.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "plumb-2",
                    Name = "Karan Johar",
                    Category = "plumber",
                    AvatarUrl = "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80",
                    Experience = "6 Years",
                    HourlyCharge = 199.00M,
                    Availability = "Today, 12 PM - 8 PM",
                    Location = "Jayanagar, Bangalore",
                    ResponseRate = "91% (under 20 mins)",
                    Rating = 4.7M,
                    ReviewsCount = 88,
                    TrustScore = 91,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Water Purifier Mounting", "Taps & Mixer Replacements", "Gutter Maintenance", "Geyser Pipeline Clamping" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "Skill India Plumbing Level 3 Certificate" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80" }),
                    About = "Quick, efficient, and cost-effective home plumbing fixes. Specialized in tap installations, RO filters assembly, and general drainage maintenance.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "mech-1",
                    Name = "Imran Khan",
                    Category = "mechanic",
                    AvatarUrl = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
                    Experience = "10 Years",
                    HourlyCharge = 399.00M,
                    Availability = "Today, 8 AM - 8 PM",
                    Location = "Marathahalli, Bangalore",
                    ResponseRate = "97% (under 15 mins)",
                    Rating = 4.9M,
                    ReviewsCount = 220,
                    TrustScore = 97,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Superbike Carburetor Tuning", "Engine Overhaul", "ECU Remapping Diagnostics", "Hydraulic Brake Bleeding" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "Yamaha Motors Certified Technician", "Automotive Skill Council Level 5 Spec" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=150&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&auto=format&fit=crop&q=80" }),
                    About = "Master technician for single-cylinder to multi-cylinder superbikes. Specializes in performance diagnostics, brake calibration, and engine tuning.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "carp-1",
                    Name = "Harpreet Singh",
                    Category = "carpenter",
                    AvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
                    Experience = "15 Years",
                    HourlyCharge = 450.00M,
                    Availability = "Mon - Fri, 9 AM - 6 PM",
                    Location = "Bellandur, Bangalore",
                    ResponseRate = "93% (under 18 mins)",
                    Rating = 4.88M,
                    ReviewsCount = 165,
                    TrustScore = 96,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Modular Kitchen Assembly", "Custom Hardwood Furniture", "Sofa Re-Upholstery", "Lock and Latch Installations" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "L&T Construction Woodworking Diploma", "Skill India Master Craftsmenship" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=150&auto=format&fit=crop&q=80" }),
                    About = "Artisan woodwork practitioner. Specializes in luxury modular setups, custom-designed storage, and high-security smart lock configurations.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "mech-2",
                    Name = "Vikram Singh",
                    Category = "mechanic",
                    AvatarUrl = "https://images.unsplash.com/photo-1620189507195-683091c4c476?w=200&auto=format&fit=crop&q=80",
                    Experience = "7 Years",
                    HourlyCharge = 299.00M,
                    Availability = "Mon - Sun, 9 AM - 9 PM",
                    Location = "HSR Layout, Bangalore",
                    ResponseRate = "94% (under 10 mins)",
                    Rating = 4.8M,
                    ReviewsCount = 95,
                    TrustScore = 93,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Car AC Repair", "Suspension Fixing", "Battery Jumpstart", "General Servicing" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "Bosch Advanced Diagnostics Certified" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=150&auto=format&fit=crop&q=80" }),
                    About = "Specialized in luxury car diagnostics and quick turnaround servicing. Expert in AC cooling issues and suspension overhauls.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "carp-2",
                    Name = "Ramesh Patel",
                    Category = "carpenter",
                    AvatarUrl = "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=200&auto=format&fit=crop&q=80",
                    Experience = "20 Years",
                    HourlyCharge = 350.00M,
                    Availability = "Weekends Only",
                    Location = "Malleswaram, Bangalore",
                    ResponseRate = "89% (under 30 mins)",
                    Rating = 4.95M,
                    ReviewsCount = 420,
                    TrustScore = 98,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Antique Restoration", "Door Polishing", "Custom Bed Frames", "Wardrobe Fitting" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "Heritage Woodworkers Guild Member" }),
                    PortfolioJson = JsonSerializer.Serialize(new string[] { "https://images.unsplash.com/photo-1601084224734-7ddbe5a3194a?w=150&auto=format&fit=crop&q=80" }),
                    About = "A seasoned craftsman focusing on preserving and restoring vintage furniture, alongside bespoke wardrobe designs.",
                    IsVerified = true,
                    IsActive = true
                },
                new Worker
                {
                    Id = "pending-1",
                    Name = "Vikram Desai",
                    Category = "electrician",
                    AvatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
                    Experience = "3 Years",
                    HourlyCharge = 199.00M,
                    Availability = "Mon-Fri, 8 AM - 6 PM",
                    Location = "HSR Layout, Bangalore",
                    ResponseRate = "New on Platform",
                    Rating = 0,
                    ReviewsCount = 0,
                    TrustScore = 0,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "House Wiring", "MCB Installation", "Fan Repair" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "ITI Electrician Diploma" }),
                    PortfolioJson = "[]",
                    About = "Recently completed ITI certification and looking to build my reputation on FixKart.",
                    JoinedAt = "2026-05-28",
                    IsVerified = false,
                    IsActive = true
                },
                new Worker
                {
                    Id = "pending-2",
                    Name = "Lakshmi Nair",
                    Category = "plumber",
                    AvatarUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
                    Experience = "6 Years",
                    HourlyCharge = 249.00M,
                    Availability = "Mon-Sat, 10 AM - 7 PM",
                    Location = "Jayanagar, Bangalore",
                    ResponseRate = "New on Platform",
                    Rating = 0,
                    ReviewsCount = 0,
                    TrustScore = 0,
                    SkillsJson = JsonSerializer.Serialize(new string[] { "Bathroom Fitting", "Water Tank Cleaning", "Pipe Leak Repair" }),
                    CertificationsJson = JsonSerializer.Serialize(new string[] { "NSDC Plumbing Level 3" }),
                    PortfolioJson = "[]",
                    About = "Experienced plumber specializing in apartment bathroom renovations.",
                    JoinedAt = "2026-05-30",
                    IsVerified = false,
                    IsActive = true
                }
            };

            foreach (Worker w in workers)
            {
                if (!context.Workers.Any(dbW => dbW.Id == w.Id))
                {
                    context.Workers.Add(w);
                }
            }
            context.SaveChanges();
        }
    }
}
