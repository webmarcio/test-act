import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import UserModel, { UserEntity } from '../../domain/entities/user';

export class UserController {
  async createUser (req: Request, res: Response) {
    const { email, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({ email, password: hash });
    
    try {
      const savedUser: UserEntity = (await user.save());
      if (savedUser) res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar o usuário', error });
    }
  }
  
  async getUsers (req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  async getUserById (req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
  }

  async updateUser (req: Request, res: Response) {
    const { id } = req.params;
    const { email, password } = req.body;
    
    let user: UserEntity = {};

    if (email) user.email = email;

    if (password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      user.password = hash
    }

    try {
      const result = await UserModel.updateOne({ _id: id }, user);
      if (result) res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados do usuário', error });
    }
  }

  async deleteUser (req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await UserModel.deleteOne({ _id: id });
      if (result) res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover dados do usuário', error });
    }
  }
}
