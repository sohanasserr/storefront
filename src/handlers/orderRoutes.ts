import express, { Application, Response, Request } from 'express';
import { Order, OrderStore, OrderProducts } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const orderStore= new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
  
    const order = await orderStore.index();
    res.status(200).json(order);
    
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};

const create = async (req: Request, res: Response) => {
  try {
  

    const enteredOrder: Order = {
      status: req.body.status,
      user_id: req.params.user_id as unknown as number,
    };

    const order = await orderStore.create(enteredOrder);
    res.status(201).json(order);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
};

const show = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.show(
          parseInt(req.params.order_id),
          parseInt(req.params.user_id)
        );
       
        res.status(200).json(result);
      } catch (err) {
        res.status(400);
        res.json('cannot process your request,'+ err);
      }

    }; 

    const showOrderProducts= async (req: Request, res: Response) => {
      try {
          const result = await orderStore.showOrderProducts(
            parseInt(req.params.order_id)
            
          );
         
          res.status(200).json(result);
        } catch (err) {
          res.status(400);
          res.json('cannot process your request,'+ err);
        }
  
      };


    const userOrders = async (req: Request, res: Response) => {
      try {
          const result = await orderStore.indexByUser(
           parseInt(req.params.user_id)
          );
         
          res.status(200).json(result);
        } catch (err) {
          res.status(400);
          res.json('cannot process your request,'+ err);
        }
  
      }; 
  
  


async function update(req: Request, res: Response) {
  try {
      const order: Order = {
      id: parseInt(req.params.order_id),
      status: req.body.status || undefined,
      user_id: req.params.user_id as unknown as number,
    };

    const result = await orderStore.update(order);
    //  console.log(result)
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
    return;
  }
}

const destroy = async (req: Request, res: Response) => {
    try {
    const result = await orderStore.delete(
      parseInt(req.params.user_id),
      parseInt(req.params.order_id)
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400);
    res.json('cannot process your request,'+ err);
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
  app.get('/orders', verifyAuthToken, index);
  app.get('/users/:user_id/orders/:order_id', verifyAuthToken,  show);
  app.post('/users/:user_id/orders', verifyAuthToken,  create);
  app.get('/users/:user_id/orders', verifyAuthToken,  userOrders);
  app.put('/users/:user_id/orders/:order_id', verifyAuthToken,  update);
  app.delete('/users/:user_id/orders/:order_id', verifyAuthToken,  destroy);
   app.post('/orders/:order_id/products', verifyAuthToken,  addProduct);
   app.get('/orders/:order_id/products', verifyAuthToken,  showOrderProducts);
};
export default orderRoute;
