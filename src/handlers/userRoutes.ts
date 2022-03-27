import express, { Request, Response, NextFunction } from 'express';
import { UserStore, User, UserUpdate } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;
const userStore = new UserStore();

const index = async (req: Request, res: Response):Promise<void> => {
  try {
   const result = await userStore.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};


const create = async (req: Request, res: Response):Promise<void> => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await userStore.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
     res.status(201).json({
      user:newUser,
      token:token
    });
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }
};

const show = async (req: Request, res: Response):Promise<void> => {
  const id = req.params.id as unknown as number;

  try {
    const user = await userStore.show(id);
    res.json(user);
   
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }

};

const update = async (req: Request, res: Response):Promise<void> => {
  try {
    const user: UserUpdate = {
      first_name: req.body.first_name || undefined,
      last_name: req.body.last_name || undefined,
      password: req.body.password || undefined,
      id: req.params.id as unknown as number,
    };

    const newUser = await userStore.update(user);
    res.json(newUser);
  
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }
  
};

const destroy = async (req: Request, res: Response):Promise<void> => {
  const id = req.params.id as unknown as number;
  try {
    const newUser = await userStore.delete(id);
    res.json(newUser);
   
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }
};

const userLogin = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = req.body.id as number;
    const password = req.body.password;

    const user = await userStore.authenticate(id, password);

    if (user !== null) {
      const token = jwt.sign({ user: user }, TOKEN_SECRET as string);

      res.json(token);
    }
  } catch (error) {
    res.status(401);
  }
};

const userRoute = async (app: express.Application):Promise<void> => {
  app.get('/users', verifyAuthToken, index);
  app.post('/users/:id', verifyAuthToken, show);
  app.post('/users/add', create);
  app.post('/users/login',userLogin);
  app.put('/users/:id',  verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
};
export default userRoute;
