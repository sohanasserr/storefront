import express, { Application, Response, Request } from 'express';
import { Order, OrderStore, OrderProducts } from '../models/order';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const orderStore= new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);
    const order = await orderStore.index();
    res.status(200).json(order);
    //  console.log(order)
  } catch (err) {
    res.status(401);
    res.json('access denied, invalid token');
    return;
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);

    const enteredOrder: Order = {
      status: req.body.status,
      user_id: req.params.user_id as unknown as number,
    };

    const order = await orderStore.create(enteredOrder);
    res.status(200).json(order);
  } catch (err) {
    res.status(401);
    res.json('access denied, invalid token');
    return;
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    const access = jwt.verify(token, TOKEN_SECRET);
    if (access) {
      try {
        const result = await orderStore.show(
          parseInt(req.params.order_id),
          parseInt(req.params.user_id)
        );
       
        res.status(200).json(result);
      } catch (err) {
        res.status(401);
      }

    } else res.send('access denied, inavalid token');
  } catch (e) {
    res.status(401).send(`${e}`);
  }
};

async function update(req: Request, res: Response) {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);

    const order: Order = {
      id: parseInt(req.params.order_id),
      status: req.body.status,
      user_id: req.params.user_id as unknown as number,
    };

    const result = await orderStore.update(order);
     console.log(result)
    res.json(result);
  } catch (err) {
    res.status(401);
    res.json('access denied, invalid token');
    return;
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
   const access= jwt.verify(token, TOKEN_SECRET);
   if(access) {
     try {
    const result = await orderStore.delete(
      parseInt(req.params.user_id),
      parseInt(req.params.order_id)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(401);
  }
  } else res.json('access denied, invalid token');
    
  } catch (e) {
    res.status(401).send(`${e}`);
  }
};

const  addProduct= async (req: Request, res: Response) => {
  try {

    const quantity = parseInt(req.body.quantity);
    const order_id = parseInt(req.params.order_id);
    const product_id = parseInt(req.body.product_id);

    const authorizationHeader = (req.headers.authorization as unknown as string);
    const token = authorizationHeader.split(' ')[1];
    const permession = jwt.verify(token, TOKEN_SECRET);
   
    if(permession){
      const o_p:OrderProducts= {
        quantity: quantity,
        order_id:order_id,
        product_id:product_id
      }
      const result = await orderStore.addProduct(o_p);
      
      res.json(result);

    }
    else
      res.send('Not allowed login first!!');
  } catch (e) {
    res.status(400).json(`${e}`);
  }
}

const orderRoute = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/users/:user_id/orders/:order_id', show);
  app.post('/users/:user_id/orders', create);
  app.put('/users/:user_id/orders/:order_id', update);
  app.delete('/users/:user_id/orders/:order_id', destroy);
   app.post('/orders/:order_id/products', addProduct);
};
export default orderRoute;
