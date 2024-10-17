import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../../domain/entities/user';

export class UserAuthController {
  async login (req: Request, res: Response) {
    const {
      email,
      password,
    } = req.body;

    if (!email) res.status(403).json({ message: 'Informe o email para continuar' });
    if (!password) res.status(403).json({ message: 'Informe uma senha para continuar' });

    try {
      const user = await UserModel.findOne({ email }).select('+password');
    
      if (user) {
        const checkUser = bcrypt.compare(password, user.password || '');
        if (!checkUser) res.status(403).json({ message: 'Senha incorreta' });

        const token = jwt.sign({
          id: user._id,
          email: user.email,
        }, 'xpto', {
          expiresIn: '1d',
        });

        user.token = token;

        await user.save();
        res.status(200).json({ token });
      } else {
        res.status(204).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'erro ao efetuar o login', error });
    }
  }
}
