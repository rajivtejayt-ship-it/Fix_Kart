import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const workers = [
  {
    id: 'elec-1',
    name: 'Rajesh Kumar',
    category: 'electrician',
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80',
    experience: '8 Years',
    hourlyCharge: 299.00,
    availability: 'Today, 9 AM - 6 PM',
    location: 'Indiranagar, Bangalore',
    responseRate: '98% (under 12 mins)',
    rating: 4.9,
    reviewsCount: 184,
    trustScore: 98,
    skillsJson: JSON.stringify(['Appliance Wiring', 'Short Circuit Repair', 'Smart Home Automation Setup', 'Distribution Board Overhauls']),
    certificationsJson: JSON.stringify(['State Electricity Board License A', 'ISO Wiring Safety Assured']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1558223180-113b85368a53?w=150&auto=format&fit=crop&q=80']),
    about: 'Specialized in high-risk residential electrical repairs and modern smart home configurations. Known for ultra-punctuality and strict adherence to IS-732 safety codes.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'elec-2',
    name: 'Sunita Rao',
    category: 'electrician',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    experience: '5 Years',
    hourlyCharge: 249.00,
    availability: 'Mon - Sat, 10 AM - 5 PM',
    location: 'Koramangala, Bangalore',
    responseRate: '95% (under 15 mins)',
    rating: 4.8,
    reviewsCount: 112,
    trustScore: 94,
    skillsJson: JSON.stringify(['Inverter Backups', 'Ceiling Fan Repair', 'Commercial Lighting Systems', 'Phase Fault Rectification']),
    certificationsJson: JSON.stringify(['National Skill Development Council (NSDC) Level-4 Certified']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1563770660941-20978e870e26?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&auto=format&fit=crop&q=80']),
    about: 'Experienced electrical engineer focusing on eco-friendly power backups, complex multi-phase lighting matrices, and rapid domestic fault detections.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'plumb-1',
    name: 'Amit Sharma',
    category: 'plumber',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    experience: '12 Years',
    hourlyCharge: 349.00,
    availability: 'Emergency Only, 24/7',
    location: 'Whitefield, Bangalore',
    responseRate: '99% (under 9 mins)',
    rating: 4.95,
    reviewsCount: 310,
    trustScore: 99,
    skillsJson: JSON.stringify(['Hydro-Jetting', 'CCTV Pipe Inspections', 'Leakage Sonar Audits', 'Bathroom Fitting Installation']),
    certificationsJson: JSON.stringify(['Indian Plumbing Association Elite Practitioner Badge', 'Advanced Pipeline Welder License']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?w=150&auto=format&fit=crop&q=80']),
    about: 'Veteran technician specializing in emergency heavy-duty drain cleaning, zero-damage water leak tracing, and premium European sanitary installations.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'plumb-2',
    name: 'Karan Johar',
    category: 'plumber',
    avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80',
    experience: '6 Years',
    hourlyCharge: 199.00,
    availability: 'Today, 12 PM - 8 PM',
    location: 'Jayanagar, Bangalore',
    responseRate: '91% (under 20 mins)',
    rating: 4.7,
    reviewsCount: 88,
    trustScore: 91,
    skillsJson: JSON.stringify(['Water Purifier Mounting', 'Taps & Mixer Replacements', 'Gutter Maintenance', 'Geyser Pipeline Clamping']),
    certificationsJson: JSON.stringify(['Skill India Plumbing Level 3 Certificate']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80']),
    about: 'Quick, efficient, and cost-effective home plumbing fixes. Specialized in tap installations, RO filters assembly, and general drainage maintenance.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'mech-1',
    name: 'Imran Khan',
    category: 'mechanic',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    experience: '10 Years',
    hourlyCharge: 399.00,
    availability: 'Today, 8 AM - 8 PM',
    location: 'Marathahalli, Bangalore',
    responseRate: '97% (under 15 mins)',
    rating: 4.9,
    reviewsCount: 220,
    trustScore: 97,
    skillsJson: JSON.stringify(['Superbike Carburetor Tuning', 'Engine Overhaul', 'ECU Remapping Diagnostics', 'Hydraulic Brake Bleeding']),
    certificationsJson: JSON.stringify(['Yamaha Motors Certified Technician', 'Automotive Skill Council Level 5 Spec']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&auto=format&fit=crop&q=80']),
    about: 'Master technician for single-cylinder to multi-cylinder superbikes. Specializes in performance diagnostics, brake calibration, and engine tuning.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'carp-1',
    name: 'Harpreet Singh',
    category: 'carpenter',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    experience: '15 Years',
    hourlyCharge: 450.00,
    availability: 'Mon - Fri, 9 AM - 6 PM',
    location: 'Bellandur, Bangalore',
    responseRate: '93% (under 18 mins)',
    rating: 4.88,
    reviewsCount: 165,
    trustScore: 96,
    skillsJson: JSON.stringify(['Modular Kitchen Assembly', 'Custom Hardwood Furniture', 'Sofa Re-Upholstery', 'Lock and Latch Installations']),
    certificationsJson: JSON.stringify(['L&T Construction Woodworking Diploma', 'Skill India Master Craftsmenship']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=150&auto=format&fit=crop&q=80']),
    about: 'Artisan woodwork practitioner. Specializes in luxury modular setups, custom-designed storage, and high-security smart lock configurations.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'mech-2',
    name: 'Vikram Singh',
    category: 'mechanic',
    avatarUrl: 'https://images.unsplash.com/photo-1620189507195-683091c4c476?w=200&auto=format&fit=crop&q=80',
    experience: '7 Years',
    hourlyCharge: 299.00,
    availability: 'Mon - Sun, 9 AM - 9 PM',
    location: 'HSR Layout, Bangalore',
    responseRate: '94% (under 10 mins)',
    rating: 4.8,
    reviewsCount: 95,
    trustScore: 93,
    skillsJson: JSON.stringify(['Car AC Repair', 'Suspension Fixing', 'Battery Jumpstart', 'General Servicing']),
    certificationsJson: JSON.stringify(['Bosch Advanced Diagnostics Certified']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=150&auto=format&fit=crop&q=80']),
    about: 'Specialized in luxury car diagnostics and quick turnaround servicing. Expert in AC cooling issues and suspension overhauls.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'carp-2',
    name: 'Ramesh Patel',
    category: 'carpenter',
    avatarUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=200&auto=format&fit=crop&q=80',
    experience: '20 Years',
    hourlyCharge: 350.00,
    availability: 'Weekends Only',
    location: 'Malleswaram, Bangalore',
    responseRate: '89% (under 30 mins)',
    rating: 4.95,
    reviewsCount: 420,
    trustScore: 98,
    skillsJson: JSON.stringify(['Antique Restoration', 'Door Polishing', 'Custom Bed Frames', 'Wardrobe Fitting']),
    certificationsJson: JSON.stringify(['Heritage Woodworkers Guild Member']),
    portfolioJson: JSON.stringify(['https://images.unsplash.com/photo-1601084224734-7ddbe5a3194a?w=150&auto=format&fit=crop&q=80']),
    about: 'A seasoned craftsman focusing on preserving and restoring vintage furniture, alongside bespoke wardrobe designs.',
    isVerified: true,
    isActive: true
  },
  {
    id: 'pending-1',
    name: 'Vikram Desai',
    category: 'electrician',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    experience: '3 Years',
    hourlyCharge: 199.00,
    availability: 'Mon-Fri, 8 AM - 6 PM',
    location: 'HSR Layout, Bangalore',
    responseRate: 'New on Platform',
    rating: 0,
    reviewsCount: 0,
    trustScore: 0,
    skillsJson: JSON.stringify(['House Wiring', 'MCB Installation', 'Fan Repair']),
    certificationsJson: JSON.stringify(['ITI Electrician Diploma']),
    portfolioJson: '[]',
    about: 'Recently completed ITI certification and looking to build my reputation on FixKart.',
    joinedAt: '2026-05-28',
    isVerified: false,
    isActive: true
  },
  {
    id: 'pending-2',
    name: 'Lakshmi Nair',
    category: 'plumber',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    experience: '6 Years',
    hourlyCharge: 249.00,
    availability: 'Mon-Sat, 10 AM - 7 PM',
    location: 'Jayanagar, Bangalore',
    responseRate: 'New on Platform',
    rating: 0,
    reviewsCount: 0,
    trustScore: 0,
    skillsJson: JSON.stringify(['Bathroom Fitting', 'Water Tank Cleaning', 'Pipe Leak Repair']),
    certificationsJson: JSON.stringify(['NSDC Plumbing Level 3']),
    portfolioJson: '[]',
    about: 'Experienced plumber specializing in apartment bathroom renovations.',
    joinedAt: '2026-05-30',
    isVerified: false,
    isActive: true
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  for (const worker of workers) {
    await prisma.worker.upsert({
      where: { id: worker.id },
      update: {},
      create: worker
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
