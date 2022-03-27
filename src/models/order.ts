import exp from 'constants';
import client from '../database';
import { User } from './user';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type OrderProducts = {
  quantity: number;
  order_id: number;
  product_id: number;
};
enum STATUS {
  'open',
  'closed',
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();
     
      return result.rows;
    } catch (err) {
      throw new Error(`could not get Orders. Error: ${err}`);
    }
  }
  
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0] as Order;

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`could not add new order ${o.id}. Error: ${err}`);
    }
  }
  
  async show(id: number, user_id: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';

      const result = await conn.query(sql, [id, user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`could not find order ${id}. Error: ${err}`);
    }
  }

  async indexByUser( user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM orders WHERE user_id=($1)';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`could not find order ${user_id}. Error: ${err}`);
    }
  }
  
  async update(o:Order ): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = 'update orders set status=($1) where id=($2) AND user_id=($3) RETURNING *; ';
      const result = await conn.query(sql, [o.status, o.id, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`could not delete order ${o.id}. Error: ${err}`);
    }
  }

  async delete(user_id: number, order_id: number): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE  FROM orders WHERE id=($1) AND user_id=($2) RETURNING *';

      const result = await conn.query(sql, [order_id, user_id ]);

      const order = result.rows[0];

      conn.release();
     

      return order;
    } catch (err) {
      throw new Error(`could not delete order ${order_id}. Error: ${err}`);
    }
  }

    async addProduct(o_p:OrderProducts): Promise<OrderProducts> {
      try {
        const conn = await client.connect();

        const sql =
          'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
          

        const result = await conn.query(sql, [o_p.quantity, o_p.order_id, o_p.product_id]);
        conn.release();


        return result.rows[0];
      } catch (err) {
        throw new Error(`couldn't add new product ${o_p.order_id}. Error: ${err}`);
      }
    }
}
