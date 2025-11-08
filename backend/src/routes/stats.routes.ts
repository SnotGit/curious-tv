import { Router } from 'express';
import { StatsService } from '../services/stats.service';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const statsService = new StatsService();

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const stats = await statsService.getAllStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const stats = await statsService.getStatsByVideoId(videoId);
    if (!stats) {
      res.status(404).json({ error: 'Stats non trouvées' });
      return;
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;