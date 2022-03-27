import supertest from 'supertest';
import app from '../../server';
import { ProductStore, Product, ProductUpdate } from '../../models/product';
import { OrderStore, Order, OrderProducts, OrderProductsDetails } from '../../models/order';
import { UserStore, User, UserUpdate } from '../../models/user';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;

let token: string;
const httpApp=  supertest(app)
let product: Product;
let user: User;
 let order: Order;
 let order_products: OrderProducts

describe('Order handler endpoint', () => {

  // console.log('start order handler spec')

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

    const p: Product = {
      name: 'canon',
      price: 250,
      category: 'digital',
    };

    
    const resp = await httpApp.post('/products/add').set('Authorization', `Bearer ${token}`).send(p);

    product= resp.body as unknown as Product;

  });


  it('should endpoint create an order', async ():Promise<void> => {
    const o= {
      status:"open",
    
    };

    
    const result = await httpApp.post('/users/'+ user.id +'/orders').set('Authorization', `Bearer ${token}`).send(o);

    order= result.body as unknown as Order;
  
  
    expect(order.user_id).toEqual(user.id as number);
 
  });

  it('index method should return a list of orders', async ():Promise<void> => {
    const result = await httpApp.get('/orders').set('Authorization', `Bearer ${token}`);
    const orders= result.body as unknown as Order[];
    expect(orders).toContain(order);
  });

  it('show method should return the correct order', async ():Promise<void> => {
    const result = await httpApp.get('/users/'+ user.id +'/orders/'+ order.id).set('Authorization', `Bearer ${token}`);
   const o = result.body as unknown as Order;
    expect(o).toEqual(order);
  });

  it('userOrder method should return user orders', async ():Promise<void> => {
    const result = await httpApp.get('/users/'+ user.id +'/orders').set('Authorization', `Bearer ${token}`);
    const orders= result.body as unknown as Order[];
    expect(orders).toContain(order);
  });

  it('should update a order', async () => {
    const update_ = {
     
   status:'closed'
      
     
    };
    const result = await httpApp.put('/users/'+ user.id +'/orders/'+ order.id)
    .set('Authorization', `Bearer ${token}`)
    .send(update_);
    
    const o = result.body as unknown as Order;
    order.status = update_.status 

    expect(o.status).toEqual(update_.status);
  });

  it('should endpoint addproduct order', async ():Promise<void> => {
    const o_p={
        
      quantity: 2,
      
      product_id: product.id as number,
    };

    
    const result = await httpApp.post('/orders/'+order.id+'/products').set('Authorization', `Bearer ${token}`).send(o_p);

    order_products= result.body as unknown as OrderProducts;
  
  
    expect(order_products.order_id).toEqual(order.id as number);
 
  });


  it('should endpoint show order products', async ():Promise<void> => {
 
    
    const result = await httpApp.get('/orders/'+order.id+'/products').set('Authorization', `Bearer ${token}`)

    const o_p= result.body as unknown as OrderProductsDetails[];
   
  
  
    expect(o_p[0].order_id).toEqual(order.id as number);
    expect(o_p[0].product_id).toEqual(product.id as number);
    expect(o_p[0].total).toEqual(product.price * order_products.quantity);
 
  });

  it('delete method should delete the correct order', async ():Promise<void> => {
    
    const result = await httpApp.delete('/users/'+ user.id +'/orders/'+ order.id).set('Authorization', `Bearer ${token}`);
    const o = result.body as unknown as Order;
     expect(o).toEqual(order);
  });
  

  });



