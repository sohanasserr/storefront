CREATE TABLE order_products (id serial primary key, 
quantity integer,
 order_id integer REFERENCES orders(id) ON DELETE CASCADE,
 product_id integer REFERENCES products(id) ON DELETE CASCADE
 ) ;
