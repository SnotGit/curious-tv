import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import videoRoutes from './routes/video.routes';
import categorieRoutes from './routes/categorie.routes';
import newsletterRoutes from './routes/newsletter.routes';
import statsRoutes from './routes/stats.routes';
import contactRoutes from './routes/contact.routes';
import userRoutes from './routes/user.routes';
import liveRoutes from './routes/live.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);
app.use('/api/live', liveRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Curious TV API' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});