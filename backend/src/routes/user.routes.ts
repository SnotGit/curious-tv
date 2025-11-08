import { Router } from 'express';
import { UserService } from '../services/user.service';
import { StatsService } from '../services/stats.service';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const userService = new UserService();
const statsService = new StatsService();

router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await userService.getUserById(req.user!.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.post('/favoris/:videoId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { videoId } = req.params;
    const user = await userService.addFavori(req.user!.userId, videoId);
    await statsService.incrementFavoris(videoId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/favoris/:videoId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { videoId } = req.params;
    const user = await userService.removeFavori(req.user!.userId, videoId);
    await statsService.decrementFavoris(videoId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/favoris', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const favoris = await userService.getFavoris(req.user!.userId);
    res.json(favoris);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;