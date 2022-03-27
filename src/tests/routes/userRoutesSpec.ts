import supertest from 'supertest';
import app from '../../server';
import { UserStore, User, UserUpdate, UserLastOrder } from '../../models/user';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

let token: string;
const httpApp=  supertest(app)
let user: User;
 
describe('User handler endpoint', () => {

  // console.log('start user handler spec')


  it('should endpoint create a user', async ():Promise<void> => {
    const u: User = {
      first_name: 'soha',
      last_name: 'nasser',
      password: '1234',
    };

    // console.log(u)
    const result = await httpApp.post('/users/add').send(u);

    // console.log(result)

    user= result.body.user as unknown as User;
    token = result.body.token as unknown as string;
  
    expect(user.first_name).toEqual(u.first_name);
    expect(token.length).toBeGreaterThan(20);
  });

  it('index method should return a list of users', async ():Promise<void> => {
    const result = await httpApp.get('/users').set('Authorization', `Bearer ${token}`);
    const users= result.body as unknown as User[];
    expect(users).toContain(user);
  });

  it('show method should return the correct user', async ():Promise<void> => {
    const result = await httpApp.get('/users/'+ user.id).set('Authorization', `Bearer ${token}`);
   const u = result.body as unknown as UserLastOrder;
    expect(u.user).toEqual(user);
  });

  it('should update a user', async () => {
    const update_ = {
     
      first_name: 'maha'
      
     
    };
    const result = await httpApp.put('/users/'+ user.id)
    .set('Authorization', `Bearer ${token}`)
    .send(update_);
    
    const u = result.body as unknown as User;
    user.first_name = update_.first_name as string

    expect(u.first_name).toEqual(update_.first_name as string);
  });

  it('delete method should delete the correct user', async ():Promise<void> => {
    
    const result = await httpApp.delete('/users/'+ user.id).set('Authorization', `Bearer ${token}`);
    const u = result.body as unknown as User;
     expect(u).toEqual(user);
  });
  

  });

