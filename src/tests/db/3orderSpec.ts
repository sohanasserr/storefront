import { Order, order } from '../../models/3order';
import { user, User } from '../../models/1user';
import { Product, product } from '../../models/2product';

const productStore = new Product();
const orderStore = new Order();
const userStore = new User();


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
  
      
  beforeAll( (done) => {
      userStore.create({
      first_name: '21',
      last_name: '50',
      password:'soha'
    }).then((result)=>{
      expect(result).toEqual({
        id: 1, 
        first_name: '21',
        last_name: '50',
        password:'soha'
      });
      done()
    });
  });
     
   

  it('should create the order',async()=>{
      const o_:order={
          
          status:"active",
          user_id:'1'
      };
      const result= await orderStore.create(o_)
      .then((result)=> {
        expect(result).toEqual({
          id: 1, 
          status:'active',
          user_id: '1'
        });
      });
      
  });
  it('index method should return a list of orders',async()=>{

      const result = await orderStore.index();
      expect(result.length).toEqual(1);
   });

  it('should show the order', async () => {
    const result = await orderStore.show(1, 1);
    expect(result).toEqual({   
       id:1,
      status:"active",
      user_id:'1'
  });

   it('should update the order',async()=>{
      const o_:order={
           id:1,
           status:"active",
          user_id:'1'
      };
      const result = await orderStore.update(o_);
      console .log(result)
      expect(result).toEqual('updated');
      console.log(result)
  });

  it('delete method should remove the order',async()=>{
      orderStore.delete(1,1);
      const result = await orderStore.index();
     
      expect(result).toEqual([]);
  });

      it('test add product to equal',async ()=>{
          const result = await orderStore.addProduct(1,1,1);
          expect(result['order_id']).toEqual(1);

      });
    });
});

