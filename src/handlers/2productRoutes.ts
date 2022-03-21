import express, { Request, Response } from 'express';
import { product, Product } from '../models/2product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const productRoutes = new Product();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await productRoutes.index();
    res.status(200).json(product);
  } catch (error) {
    res.json(400);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);

    const p: product = {
      name: req.body.name,
      price: req.body.price as unknown as number,
      category: req.body.category,
    };
    const product = await productRoutes.create(p);
    res.status(200).json(product);
  } catch (err) {
    res.status(401);
    res.json('access denied, inavlid token');
    return;
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await productRoutes.show(req.body.id as unknown as number);
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
    throw new Error('Cannot show product');
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);

    const p: product = {
      id: req.params.id as unknown as number,
      name: req.body.name,
      price: req.body.price as unknown as number,
      category: req.body.category,
    };
    const product = await productRoutes.update(p);
    res.status(200).json(product);
  } catch (err) {
    res.status(401);
    res.json('acess denied, inavlid token');
    return;
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);
    console.log(`error2`);
    const product = await productRoutes.delete(
      req.body.id as unknown as number
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(401);
    res.json('access denied, invalid token');
    return;
  }
};

const productRoute = (app: express.Application) => {
  app.get('/products', index);
  app.post('/createproducts', create);
  app.post('/showproducts', show);
  app.put('/updateproducts/:id', update);
  app.delete('/delproducts', destroy);
};
export default productRoute;
