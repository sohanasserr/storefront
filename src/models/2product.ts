import client from '../database';

export type product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class Product {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async create(p: product): Promise<product> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      console.log(p);
      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async show(id: number): Promise<product> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async update(p: product): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql =
        'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *; ';

      const result = await conn.query(sql, [p.name, p.price, p.category, p.id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`could not update product ${p.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`could not delete product ${id}. Error: ${err}`);
    }
  }
}
