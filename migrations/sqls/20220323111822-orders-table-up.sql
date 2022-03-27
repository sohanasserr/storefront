CREATE TABLE orders (id SERIAL PRIMARY KEY,
status VARCHAR(150),
user_id integer references users(id) ON DELETE CASCADE
);
