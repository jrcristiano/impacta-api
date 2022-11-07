import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserService from '../services/UserService';
import env from '../../env';
import IUser from '../interfaces/IUser';
import User from '../entities/User';

class UserController {
  async index(req: Request, res: Response) {
    try {
      return res.status(200).json(await UserService.getAll(req));
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async store(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        return res.status(400).json({
          message: errors.array()
        });
      }
      
      const body = req.body as IUser;
      body.password = bcrypt.hashSync(body.password, env.PASSWORD_SALT);

      return res.status(201).json(await UserService.create(body));
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await UserService.findById(req.params.id) as User;
      if (!user) {
        return res.status(404).json({
          message: `Usuário ${req.params.id} não encontrado.`,
        })
      }

      return res.status(200).json(user);
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        return res.status(400).json({
          message: errors.array()
        })
      }

      const body = req.body as IUser;
      if (body.password) {
        body.password = bcrypt.hashSync(body.password, env.PASSWORD_SALT);
      }

      await UserService.update(req.params.id, req.body);
      return res.status(200).json({
        message: `Usuário ${req.params.id} editado com sucesso.`
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await UserService.forceDelete(req.params.id);
      return res.status(200).json({
        message: `Usuário ${req.params.id} removido com sucesso.`
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }
}

export default new UserController;