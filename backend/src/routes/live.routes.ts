import { Router } from 'express';
import { LiveService } from '../services/live.service';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const liveService = new LiveService();

// ======== CREATE LIVE =========

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const live = await liveService.createLive(req.body);
    res.status(201).json(live);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// ======== GET ALL LIVES =========

router.get('/', async (req, res) => {
  try {
    const lives = await liveService.getAllLives();
    res.json(lives);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ======== GET NEXT LIVE =========

router.get('/next', async (req, res) => {
  try {
    const live = await liveService.getNextLive();
    res.json(live);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ======== GET CURRENT LIVE =========

router.get('/current', async (req, res) => {
  try {
    const live = await liveService.getCurrentLive();
    res.json(live);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ======== GET LIVE BY ID =========

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const live = await liveService.getLiveById(id);
    if (!live) {
      res.status(404).json({ error: 'Live non trouvé' });
      return;
    }
    res.json(live);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ======== UPDATE LIVE =========

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const live = await liveService.updateLive(id, req.body);
    res.json(live);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// ======== DELETE LIVE =========

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await liveService.deleteLive(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// ======== START LIVE =========

router.patch('/:id/start', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { urlLive } = req.body;
    const live = await liveService.startLive(id, urlLive);
    res.json(live);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// ======== END LIVE =========

router.patch('/:id/end', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const live = await liveService.endLive(id);
    res.json(live);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;