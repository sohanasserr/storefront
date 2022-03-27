import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};
export type UserUpdate = {
  id: number;
  first_name?: string;
  last_name?: string;
  password?: string
 
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable to create user (${u.first_name}. Error: ${err})`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`could not find user ${id}. Error: ${err}`);
    }
  }

  async update(u: UserUpdate): Promise<User> {
    try {
      const conn = await client.connect();
      const values = [];
      let innerSql= '';
      let count = 0;
      if(u.first_name){
        count++;
        values.push(u.first_name);
        innerSql += 'first_name=$' + count + ',';
      }
      if(u.last_name){
        count++;
        values.push(u.last_name);
        innerSql += 'last_name=$' + count + ',';
      }
      if(u.password){
        count++;
        const hash = bcrypt.hashSync(
          u.password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string)
        );
        values.push(hash);
        innerSql += 'password=$' + count + ',';
      }

      if(count>=1){ 
        count++;
        values.push(u.id);
        innerSql = innerSql.slice(0, innerSql.length - 1);
        innerSql += ' WHERE id=$' + count;
        const sql =
         'UPDATE users SET ' + innerSql + ' RETURNING *';

      const result = await conn.query(sql, values);

      const user = result.rows[0];
      conn.release();
     

      return user;
        
      }else {
        throw new Error(`unable to update user`);
      }
     
    } catch (err) {
      throw new Error(`unable to update user (${u.first_name}. Error: ${err})`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`could not delete user ${id}. Error: ${err} `);
    }
  }

  async authenticate(
    id: number,
    password: string
  ): Promise<string | null> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        } else {
          throw new Error(`user ${id} password doesn't match`);
        }
      } else{ throw new Error(`user not found`);}
      
    } catch (err) {
      throw new Error(`could not authenticate user`);
    }
  }
}
