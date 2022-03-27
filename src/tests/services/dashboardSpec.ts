import supertest from 'supertest';
import app from '../../server';
import { ProductStore, Product, ProductUpdate } from '../../models/product';
import { OrderStore, Order, OrderProducts, OrderProductsDetails } from '../../models/order';
import { UserStore, User, UserUpdate, UserLastOrder } from '../../models/user';
import { DashboardRoute, TopProduct } from '../../services/dashboard';
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

describe('dashboard services endpoint', () => {

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

    const p4= resp.body as unknown as Product;

   const resp2= await httpApp.post('/products/add').set('Authorization', `Bearer ${token}`).send({
      name: 'tv',
      price: 260,
      category: 'digital',
    });
    const p2= resp2.body as unknown as Product;

    
   const resp3= await httpApp.post('/products/add').set('Authorization', `Bearer ${token}`).send({
        name: 'mac',
        price: 220,
        category: 'electronics',
      });
      const p3= resp3.body as unknown as Product;

     const resp4= await httpApp.post('/products/add').set('Authorization', `Bearer ${token}`).send({
        name: 'mouse',
        price: 290,
        category: 'electronics',
      });
      product= resp4.body as unknown as Product;
      
      let ores = await httpApp.post('/users/'+ user.id +'/orders').set('Authorization', `Bearer ${token}`).send({status:'open'});
      let od= ores.body as unknown as Order;
      await httpApp.post('/orders/'+od.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:2, product_id:product.id});
      await httpApp.post('/orders/'+od.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:2, product_id:p2.id});
      order=od


      let ores2 = await httpApp.post('/users/'+ user.id +'/orders').set('Authorization', `Bearer ${token}`).send({status:'open'});
      let od2= ores2.body as unknown as Order;
      await httpApp.post('/orders/'+od2.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:3, product_id:product.id});
      await httpApp.post('/orders/'+od2.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:4, product_id:p3.id});

      let ores3 = await httpApp.post('/users/'+ user.id +'/orders').set('Authorization', `Bearer ${token}`).send({status:'open'});
      let od3= ores3.body as unknown as Order;
      await httpApp.post('/orders/'+od3.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:3, product_id:product.id});
      await httpApp.post('/orders/'+od3.id+'/products').set('Authorization', `Bearer ${token}`).send({quantity:5, product_id:p4.id});


  });

    
   
  it('dashboard services should return top five products', async ():Promise<void> => {
    const result = await httpApp.get('/top_products');
    const top_products= result.body as unknown as TopProduct[];


    expect(top_products[0].id).toEqual(product.id as number);
  });

  it('should user return the last five orders', async ():Promise<void> => {
    const result = await httpApp.get('/users/'+ user.id).set('Authorization', `Bearer ${token}`);
   const u = result.body as unknown as UserLastOrder;
   
    expect(u.user).toEqual(user);
    expect(u.lastorders).toContain(order);
   

  });

  
  

  });

