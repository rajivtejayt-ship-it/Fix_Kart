import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// GET: /api/Workers?category=&location=&verifiedOnly=true
router.get('/', async (req, res) => {
  try {
    const { category, location, verifiedOnly } = req.query;
    
    const where = { isActive: true };
    
    if (verifiedOnly === 'true') {
      where.isVerified = true;
    }
    
    if (category && category.toLowerCase() !== 'all') {
      where.category = category.toLowerCase();
    }
    
    if (location && location !== 'All Locations') {
      const area = location.split(',')[0].trim().toLowerCase();
      where.location = {
        contains: area,
        mode: 'insensitive'
      };
    }
    
    const workers = await prisma.worker.findMany({ where });
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// GET: /api/Workers/{id}
router.get('/:id', async (req, res) => {
  try {
    const worker = await prisma.worker.findUnique({
      where: { id: req.params.id }
    });
    
    if (!worker || !worker.isActive || !worker.isVerified) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
});

// POST: /api/Workers
router.post('/', async (req, res) => {
  try {
    const { name, category, experience, charge, availability, location, about, avatar, skills, certifications } = req.body;
    
    if (!name || !category || !location) {
      return res.status(400).json({ error: 'name, category, and location are required.' });
    }
    
    // Parse charge - remove non-digits
    const chargeStr = charge || '₹0';
    const chargeValue = parseFloat(chargeStr.replace(/[^\d]/g, '')) || 0;
    
    const worker = await prisma.worker.create({
      data: {
        id: `worker-${Date.now()}`,
        name,
        category: category.toLowerCase(),
        experience: experience || '0 Years',
        hourlyCharge: chargeValue,
        availability: availability || 'To be confirmed',
        location,
        responseRate: 'New on Platform',
        rating: 0,
        reviewsCount: 0,
        trustScore: 0,
        skillsJson: JSON.stringify(skills || []),
        certificationsJson: JSON.stringify(certifications || []),
        portfolioJson: '[]',
        about: about || '',
        avatarUrl: avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
        joinedAt: new Date().toISOString().split('T')[0],
        isVerified: false,
        isActive: true
      }
    });
    
    res.status(201).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create worker' });
  }
});

export default router;
