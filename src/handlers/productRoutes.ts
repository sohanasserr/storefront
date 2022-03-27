import express, { Request, Response } from 'express';
import { ProductStore, Product, ProductUpdate } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const productStore = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await productStore.index();
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
   const p: Product = {
      name: req.body.name,
      price: req.body.price as unknown as number,
      category: req.body.category,
    };
    const product = await productStore.create(p);
    res.status(201).json(product);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await productStore.show(req.params.id as unknown as number);
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
      const p: ProductUpdate = {
      id: req.params.id as unknown as number ,
      name: req.body.name || undefined,
      price: req.body.price as unknown as number || undefined,
      category: req.body.category || undefined,
    };
    const product = await productStore.update(p);
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
     const product = await productStore.delete(
      req.params.id as unknown as number
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};

const productRoute = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products/add', verifyAuthToken, create);
  app.get('/products/:id', show);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};
export default productRoute;
