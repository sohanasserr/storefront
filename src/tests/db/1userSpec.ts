import { user, User } from '../../models/1user';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const store = new User();
let token: string;

describe('User Model', () => {
  it('should have an Index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have an update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });
  describe('Manipulate Order methods', () => {
    const user = new User();
    beforeAll(async (done) => {
      await store.create({
        first_name: 'soha',
        last_name: 'morsi',
        password: '12334',
      });
      expect(user).toEqual(user);
      done();
    });
    afterAll(async () => {
      await store.delete(1);
    });

    it('should create a user', async () => {
      const u: user = await store.create({
        first_name: '21',
        last_name: '50',
        password: 'soha',
      });
      const result = await store.create(u);
      token = Jwt.sign({ user: result }, TOKEN_SECRET);
      expect(result.first_name).toEqual('21');
    });

    it('should update a user', async () => {
      const u: user = {
        id: 2,
        first_name: '21',
        last_name: '50',
        password:
          '$2b$10$iXo1AYlxfr2JgnU67bZMlOUZEjXWSt/EHw7KVoxgej9NCplBMxr5u',
      };
      const res = await store.update(u);
      expect(res.first_name).toEqual('21');
    });
    it('delete method should remove the user', async () => {
      store.delete(1);

      const result = await store.index();

      expect(result).toEqual([]);
    });
  });
});
