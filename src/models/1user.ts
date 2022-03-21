import client from '../database';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type user = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class User {
  async index(): Promise<user[]> {
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
  async create(u: user): Promise<user> {
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

  async show(id: number): Promise<user> {
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

  async update(u: user): Promise<user> {
    try {
      const conn = await client.connect();

      const sql =
        'UPDATE "users" SET "first_name"=($1) , "last_name"=($2) WHERE "id"=($3) RETURNING *';

      const result = await conn.query(sql, [u.first_name, u.last_name, u.id]);

      const user = result.rows[0];
      conn.release();
      // console.log(u.first_name)
      // console.log(u.last_name)
      // console.log(u.id)

      return user;
    } catch (err) {
      throw new Error(`unable to update user (${u.first_name}. Error: ${err})`);
    }
  }

  async delete(id: number): Promise<user> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM users WHERE id = ($1)';

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`could not delete user ${id}. Error: ${err} `);
    }
  }

  async authenticate(
    username: number,
    password: string
  ): Promise<string | null> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`could not authenticate user`);
    }
  }
}
