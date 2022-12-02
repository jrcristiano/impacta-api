import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/UserService';
import IUser from '../interfaces/Entities/User';
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
        const errorMessages = errors.array().map(error => error.msg);

        return res.status(400).json({
          message: errorMessages
        });
      }

      await UserService.save(req);
      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso!'
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await UserService.findUserById(req) as User;
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

      await UserService.save(req);
      return res.status(200).json({
        message: `Usuário ${req.params.id} editado com sucesso.`
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await UserService.getRepository().delete(req.params.id);
      return res.status(200).json({
        message: `Usuário ${req.params.id} removido com sucesso.`
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  }
}

export default new UserController;