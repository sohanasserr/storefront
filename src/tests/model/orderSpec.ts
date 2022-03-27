import { Order, OrderProducts, OrderStore } from '../../models/order';
import { UserStore, User } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const productStore = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();


describe('Orders model', () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });
  it('should have an create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have an show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(orderStore.delete).toBeDefined();
  });

  it('should have an update method', () => {
    expect(orderStore.update).toBeDefined();
  });
  it('should have add a product method',()=>{
      expect(orderStore.addProduct).toBeDefined();
  });
  
      let product: Product;
      let user:User;
      let order:Order;
      let orderProducts:OrderProducts;

  beforeAll( async():Promise<void> => {
    user= await userStore.create({
      first_name: 'soha',
      last_name: 'nasser',
      password:'123'
    });

    product= await productStore.create({
      name: 'canon',
      price: 250,
      category: 'digital',
    });


  });
     
   

  it('should create the order',async()=>{
      const o_:Order={
          
          status:"open",
          user_id:user.id as number
      };
     order= await orderStore.create(o_)
      
      expect(order.user_id).toEqual(user.id as number);


          
  });


  it('should insert order_products',async()=>{
    const o_p:OrderProducts={
        
      quantity: 2,
      order_id: order.id as number,
      product_id: product.id as number,
    };
    orderProducts= await orderStore.addProduct(o_p)
    
    expect(orderProducts.order_id).toEqual(order.id as number);


        
});


  it('index method should return a list of all orders',async()=>{

      const result = await orderStore.index();
      expect(result).toContain(order);
   });

   it('indexByUser method should return a list of user orders',async()=>{

    const result = await orderStore.indexByUser(user.id as number);
    expect(result).toContain(order);
 });

  it('should show the order', async () => {
    const result = await orderStore.show(order.id as number, user.id as number);
    expect(result).toEqual(order);
  });

   it('should update the order',async()=>{
      const o_:Order={
           id:order.id as number,
           status:"closed",
          user_id:user.id as number
      };
      const result = await orderStore.update(o_);
      expect(result.status).toEqual(o_.status);
      
  });

  it('delete method should remove the order',async()=>{
    const result = await orderStore.delete(user.id as number, order.id as number);
     
      expect(result.id).toEqual(order.id);
  });


   
});

