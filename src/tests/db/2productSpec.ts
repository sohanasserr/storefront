import { Product } from '../../models/2product';
import dotenv from 'dotenv';

const store = new Product();

dotenv.config();

describe('Product Model', () => {
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

  it('index method should return a list of product', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'canon',
        price: 250,
        category: 'digital',
      },
    ]);
  });
 
  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'canon',
      price: 250,
      category: 'digital',
    });
    expect(result).toEqual({
      id: 1,
      name: 'canon',
      price: 250,
      category: 'digital',
    });
  });
  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result['id']).toEqual(1);
  });


 it('delete method should remove the product', async () => {
    store.delete(0);
    const result = await store.index();

    expect(result).toEqual([]);
  });

 
});
