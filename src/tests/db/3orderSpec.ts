import { Order, order } from '../../models/3order';
import { user, User } from '../../models/1user';
import { Product, product } from '../../models/2product';

const productStore = new Product();
const orderStore = new Order();
const userStore = new User();

const p: product = {
  id: 2,
  name: 'tv',
  price: 50,
  category: 'electronics',
};
const u: user = {
  id: 3,
  first_name: '21',
  last_name: '50',
  password: '$2b$10$vVPo7EbrR7MmxJ2Gb73PAeOGDHXE9GHND75O8Aj.r9ETm5tfg9TOC',
};

const o: order = {
  id: 4,
  status: 'active',
  user_id: 7,
};

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
  // it('should have add a product method',()=>{
  //     expect(orderStore.addProduct).toBeDefined();
  // })
  describe('Manipulate Order methods', () => {
      const user = new User();
    beforeAll( (done) => {
       userStore.create({
        first_name: '21',
        last_name: '50',
        password:'$2b$10$nnT556vRxnUwQcZejmy4SeoJ9OUQpG0.kk5Mxj1gA7eR7QLz/BcX.'
      })
       expect(user).toEqual(user);
       done()
      });
  //     afterAll( () => {
  //          userStore.delete(1);
  //     });

  it('should create the order',async()=>{
      const o_:order={
          id:8,
          status:"active",
          user_id:7
      };
      const result= await orderStore.create(o_);
      expect(result).toEqual('created');
  })
  it('index method should return a list of orders',async()=>{

      const result = await orderStore.index();
      expect(result.length).toEqual(5);
   })

  it('should show the order', async () => {
    const result = await orderStore.show(11, 7);
    expect(result['user_id']).toEqual(1);
  });

   it('should update the order',async()=>{
      const o_:order={
           id:4,
           status:"active",
          user_id:7
      };
      const result = await orderStore.update(o_);
      console .log(result)
      expect(result).toEqual('updated');
      console.log(result)
  })

  it('delete method should remove the order',async()=>{
      const result = await orderStore.delete(3,7);
      console.log(result)
      expect(result['id']).toEqual(1);
  });

      // it('test add product to equal',async ()=>{
      //     const res = await orderStore.addProduct(4,1,1);
      //     expect(res.order_id).toEqual(1);

      // })
    })
});
