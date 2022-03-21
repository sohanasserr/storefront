import exp from 'constants';
import client from '../database';
import { User } from './1user';

export type order = {
  id?: number;
  status: string;
  user_id: number;
};
export type order_products = {
  quantity: number;
  order_id: number;
  product_id: number;
};
enum STATUS {
  'open',
  'closed',
}

export class Order {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`could not get Orders. Error: ${err}`);
    }
  }
  async create(o: order): Promise<string> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`could not add new order ${o.id}. Error: ${err}`);
    }
  }
  async show(id: number, user_id: number): Promise<order> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';

      const result = await conn.query(sql, [id, user_id]);

      conn.release();
console.log(result.rows[0])
      return result.rows[0];
    } catch (err) {
      throw new Error(`could not find order ${id}. Error: ${err}`);
    }
  }
  async update(o: order): Promise<string> {
    try {
      const conn = await client.connect();

      const sql = 'update orders set status=($1) where id=($2) RETURNING *; ';
      const result = await conn.query(sql, [o.status, o.id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`could not delete order ${o.id}. Error: ${err}`);
    }
  }

  async delete(user_id: number, order_id: number): Promise<order> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE  FROM orders WHERE id=($1) AND user_id=($2)';

      const result = await conn.query(sql, [user_id, order_id]);

      const order = result.rows[0];

      conn.release();
      console.log(result.rows[0]);

      return order;
    } catch (err) {
      throw new Error(`could not delete order ${order_id}. Error: ${err}`);
    }
  }

    async addProduct(
      quantity: number,
      order_id: number,
      product_id: number,

    ): Promise<order_products> {
      try {
        const conn = await client.connect();

        const sql =
          'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';

        const result = await conn.query(sql, [quantity, order_id, product_id]);
        conn.release();
  console.log('ss')

        return result.rows[0];
      } catch (err) {
        throw new Error(`couldn't add new product ${order_id}. Error: ${err}`);
      }
    }
}
