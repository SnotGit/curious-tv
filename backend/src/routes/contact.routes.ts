import { Router } from 'express';
import { ContactService } from '../services/contact.service';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const contactService = new ContactService();

router.post('/', async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactService.getContactById(id);
    if (!contact) {
      res.status(404).json({ error: 'Contact non trouvé' });
      return;
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.patch('/:id/read', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactService.markAsRead(id);
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await contactService.deleteContact(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;