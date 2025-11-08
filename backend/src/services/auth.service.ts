import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
  async register(email: string, password: string, role: 'ADMIN' | 'VIEWER' = 'VIEWER') {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        favoris: []
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as 'ADMIN' | 'VIEWER'
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
}