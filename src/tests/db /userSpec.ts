import { UserStore, User, UserUpdate } from '../../models/user';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

const store = new UserStore();
let token: string;

describe('User Model', () => {
  let user: User;

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


    it('should create a user', async () => {
      const u: User = await store.create({
        first_name: 'soha',
        last_name: 'nasser',
        password: '1234',
      });
      
      const result = await store.create(u);
      user= result;
      expect(result.first_name).toEqual(u.first_name);
    });

    it('index method should return a list of users', async () => {
      const result = await store.index();
      expect(result).toContain(user);
    });

    it('show method should return the correct user', async () => {
      const result  = await store.show(user.id as number);
      expect(result).toEqual(user);
    });

    it('should update a user', async () => {
      const u: UserUpdate = {
        id: user.id as number,
        first_name: 'maha'
        
       
      };
      const res = await store.update(u);
      user.first_name = u.first_name as string

      expect(res.first_name).toEqual(u.first_name as string);
    });

    it('delete method should delete the correct user', async () => {
      
      const result  = await store.delete(user.id as number);
      
      expect(result).toEqual(user);
    });
  });

