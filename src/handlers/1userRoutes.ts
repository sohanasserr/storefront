import express, { Request, Response } from 'express';
import { user, User } from '../models/1user';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;
const userRoutes = new User();

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);
    const result = await userRoutes.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(400);
    res.json('not allowed login');
    return;
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await userRoutes.create(user);

    res.json(newUser);
  } catch (err) {
    res.status(400);
    throw new Error(`user not created` + err);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.body.id;

  try {
    const user = await userRoutes.show(id);
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(400);
  }
  throw new Error(`user does not exist`);
};

const update = async (req: Request, res: Response) => {
  try {
    const user: user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      id: req.body.id as number,
    };
    const newUser = await userRoutes.update(user);
    res.json(newUser);
    console.log('1');
  } catch (err) {
    res.status(400);
  }
  throw new Error(`user cannot be updated`);
};

const destroy = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const newUser = await userRoutes.delete(id);
    res.json(newUser);
    console.log(newUser);
  } catch (err) {
    throw new Error(`user cannot be deleted`);
  }
};

const verifyAuthToken = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userRoutes.authenticate(username, password);

    if (user !== null) {
      const token = jwt.sign({ user1: user }, TOKEN_SECRET as string);

      res.json(token);
    }
  } catch (error) {
    res.status(401);
  }
};

const userRoute = (app: express.Application) => {
  app.get('/users', index);
  app.post('/showusers', show);
  app.post('/createusers', create);
  app.post('/authusers', verifyAuthToken);
  app.put('/upusers', update);
  app.delete('/delusers', destroy);
};
export default userRoute;
