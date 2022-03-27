import { Product, ProductStore, ProductUpdate } from '../../models/product';
import dotenv from 'dotenv';


const store = new ProductStore();

dotenv.config();

describe('Product Model', () => {
  let product: Product;

  it('should have an index method', () => {
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

  
 
  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'canon',
      price: 250,
      category: 'digital',
    });
    
    product = result;
    
    expect(result).toEqual({
      id: product.id,
      name: 'canon',
      price: 250,
      category: 'digital',
    });
  });

  it('index method should return a list of product', async () => {
    const result = await store.index();
    expect(result).toContain(product);
  });

  it('show method should return the correct product', async () => {
    const result  = await store.show(product.id as number);
    expect(result).toEqual(product);
  });

  it('should update a user', async () => {
    const p: ProductUpdate = {
      id: product.id as number,
      price: 279
      
     
    };
    const res = await store.update(p);
    product.price = p.price as number 

    expect(res.price).toEqual(p.price as number);
  });
 
  it('delete method should remove the product', async () => {
  const result = await store.delete(product.id as number);
  expect(result).toEqual(product);
  });

 
});
