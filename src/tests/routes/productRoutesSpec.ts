import supertest from 'supertest';
import app from '../../server';
import { ProductStore, Product, ProductUpdate } from '../../models/product';
import { UserStore, User, UserUpdate } from '../../models/user';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

let token: string;
const httpApp=  supertest(app)
let product: Product;
let user: User;
 
describe('Product handler endpoint', () => {

  // console.log('start product handler spec')

  beforeAll(async ():Promise<void> => {
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

  });


  it('should endpoint create a product', async ():Promise<void> => {
    const p: Product = {
      name: 'canon',
      price: 250,
      category: 'digital',
    };

    
    const result = await httpApp.post('/products/add').set('Authorization', `Bearer ${token}`).send(p);

    product= result.body as unknown as Product;
  
  
    expect(product.name).toEqual(p.name);
 
  });

  it('index method should return a list of products', async ():Promise<void> => {
    const result = await httpApp.get('/products');
    const products= result.body as unknown as Product[];
    expect(products).toContain(product);
  });

  it('show method should return the correct product', async ():Promise<void> => {
    const result = await httpApp.get('/products/'+ product.id);
   const p = result.body as unknown as Product;
    expect(p).toEqual(product);
  });

  it('should update a product', async () => {
    const update_ = {
     
      price: 275
      
     
    };
    const result = await httpApp.put('/products/'+ product.id)
    .set('Authorization', `Bearer ${token}`)
    .send(update_);
    
    const p = result.body as unknown as Product;
    product.price = update_.price as number

    expect(p.price).toEqual(update_.price as number);
  });

  it('delete method should delete the correct product', async ():Promise<void> => {
    
    const result = await httpApp.delete('/products/'+ product.id).set('Authorization', `Bearer ${token}`);
    const p = result.body as unknown as Product;
     expect(p).toEqual(product);
  });
  

  });


