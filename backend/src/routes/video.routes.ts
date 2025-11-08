import { Router } from 'express';
import { VideoService } from '../services/video.service';
import { StatsService } from '../services/stats.service';
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const videoService = new VideoService();
const statsService = new StatsService();

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { statut } = req.query;
    const videos = await videoService.getAllVideos(statut as any);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ error: 'Query parameter manquant' });
      return;
    }
    const videos = await videoService.searchVideos(q as string);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/categorie/:categorie', async (req, res) => {
  try {
    const { categorie } = req.params;
    const videos = await videoService.getVideosByCategorie(categorie);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoService.getVideoById(id);
    if (!video) {
      res.status(404).json({ error: 'Vidéo non trouvée' });
      return;
    }
    await statsService.incrementVues(id);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoService.updateVideo(id, req.body);
    res.json(video);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await videoService.deleteVideo(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;