import express, { Application, Response, Request } from 'express';
import client from '../database';

export type TopProduct = {
    id: number;
    name: string;
    price: number;
    category: string;
    purchase_count: number;
  };

  

export const topFiveProductsModel=async ():Promise<TopProduct[]> => {

try {
    
      const conn = await client.connect();

      const sql = 'SELECT p.id, p.name, p.category, p.price, COUNT(p.id) AS purchase_count FROM order_products AS op INNER JOIN products AS p ON p.id=op.product_id GROUP BY p.id ORDER BY COUNT (p.id) DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get dashboard top products. Error: ${err}`);
    }

    
}

const topProducts = async (req: Request, res: Response) => {
    try {
    
      const top_products = await topFiveProductsModel();
      res.status(200).json(top_products);
      
    } catch (err) {
      res.status(400);
      res.json('cannot process your request,'+ err);
      return;
    }
  };


  export const DashboardRoute = (app: express.Application) => {
    app.get('/top_products', topProducts);
    
    
  };

 
  