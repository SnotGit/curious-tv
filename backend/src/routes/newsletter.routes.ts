import { Router } from 'express';
import { NewsletterService } from '../services/newsletter.service';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const newsletterService = new NewsletterService();

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscription = await newsletterService.subscribe(email);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    await newsletterService.unsubscribe(email);
    res.status(200).json({ message: 'Désinscription réussie' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/subscribers', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const subscribers = await newsletterService.getAllSubscribers();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;