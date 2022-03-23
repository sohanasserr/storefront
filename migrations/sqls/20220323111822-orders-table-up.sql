CREATE TABLE orders ("id" SERIAL PRIMARY KEY,
"status" VARCHAR(150),
"user_id" bigint references users(id));
