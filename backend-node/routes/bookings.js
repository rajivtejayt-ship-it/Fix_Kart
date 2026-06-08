import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// POST: /api/Bookings
router.post('/', async (req, res) => {
  try {
    const { workerId, customerName, customerPhone, location, description, category, scheduledTime } = req.body;
    
    if (!workerId || !customerName || !customerPhone || !location) {
      return res.status(400).json({ error: 'workerId, customerName, customerPhone, and location are required.' });
    }
    
    const worker = await prisma.worker.findUnique({
      where: { id: workerId }
    });
    
    if (!worker || !worker.isVerified || !worker.isActive) {
      return res.status(400).json({ error: 'Worker not found or not yet verified.' });
    }
    
    let scheduled = null;
    if (scheduledTime) {
      const parsed = new Date(scheduledTime);
      if (!isNaN(parsed.getTime())) {
        scheduled = parsed;
      }
    }
    
    const securityPin = Math.floor(1000 + Math.random() * 9000).toString();
    
    const booking = await prisma.booking.create({
      data: {
        id: `booking-${Date.now()}`,
        customerId: 'fk-guest',
        customerName,
        customerPhone,
        location,
        description: description || '',
        workerId,
        category: category || worker.category,
        bookingTime: new Date(),
        scheduledTime: scheduled,
        baseRate: worker.hourlyCharge,
        status: 'Pending',
        securityPin,
        escrowLocked: true
      }
    });
    
    res.status(201).json({
      id: booking.id,
      workerId: booking.workerId,
      workerName: worker.name,
      category: booking.category,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      location: booking.location,
      description: booking.description,
      scheduledTime: booking.scheduledTime?.toISOString(),
      status: booking.status,
      securityPin: booking.securityPin,
      createdAt: booking.bookingTime.toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET: /api/Bookings/{id}
router.get('/:id', async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: { worker: true }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// POST: /api/Bookings/{id}/release
router.post('/:id/release', async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    await prisma.booking.update({
      where: { id: req.params.id },
      data: {
        status: 'Completed',
        escrowLocked: false
      }
    });
    
    res.json({ message: 'Escrow funds released.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to release escrow' });
  }
});

export default router;
