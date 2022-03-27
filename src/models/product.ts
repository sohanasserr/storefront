import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};
export type ProductUpdate = {
  id: number;
  name?: string;
  price?:number;
  category?: string;
  
};

export class ProductStore {
  async index(): Promise<Product[]> {
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

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
    
      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
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

  async update(p: ProductUpdate): Promise<Product> {
    try {
      const conn = await client.connect();

      const values = [];
      let innerSql= '';
      let count = 0;
      if(p.name){
        count++;
        values.push(p.name);
        innerSql += 'name=$' + count + ',';
      }
      if(p.price){
        count++;
        values.push(p.price);
        innerSql += 'price=$' + count + ',';
      }
      if(p.category){
        count++;
        values.push(p.category);
        innerSql += 'category=$' + count + ',';
      }
     

      if(count>=1){ 
        count++;
        values.push(p.id);
        innerSql = innerSql.slice(0, innerSql.length - 1);
        innerSql += ' WHERE id=$' + count;
        const sql =
         'UPDATE products SET ' + innerSql + ' RETURNING *';

      const result = await conn.query(sql, values);

      const product = result.rows[0];
      conn.release();
     

      return product;
        
      }else {
        throw new Error(`unable to update products`);
      }
      }catch (err) {
      throw new Error(`could not update product ${p.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *; ';

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`could not delete product ${id}. Error: ${err}`);
    }
  }
}
