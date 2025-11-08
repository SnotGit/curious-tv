import { Router } from 'express';
import { CategorieService } from '../services/categorie.service';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const categorieService = new CategorieService();

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const categorie = await categorieService.createCategorie(req.body);
    res.status(201).json(categorie);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await categorieService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await categorieService.getCategorieById(id);
    if (!categorie) {
      res.status(404).json({ error: 'Catégorie non trouvée' });
      return;
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await categorieService.updateCategorie(id, req.body);
    res.json(categorie);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await categorieService.deleteCategorie(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;