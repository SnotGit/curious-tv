import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: 'ADMIN' | 'VIEWER';
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token manquant' });
      return;
    }

    const token = authHeader.substring(7);
    const payload = authService.verifyToken(token);
    
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Accès admin requis' });
    return;
  }
  next();
};