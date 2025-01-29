const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/shoe_store_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    brand VARCHAR(255),
    category VARCHAR(255),
    gender VARCHAR(10) CHECK (gender IN ('men', 'women', 'unisex')),
    size JSON,
    color VARCHAR(50),
    stock INT DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    ALTER TABLE products 
    DROP COLUMN image_url, 
    ADD COLUMN image_urls TEXT[];
    `;
  await client.query(SQL);

}

const createUser = async ({ name, email, password, phone, address, role = 'customer' }) => {
  try {
    const SQL = `INSERT INTO users(id, name, email, password, phone, address, role, created_at, updated_at) 
                  values($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL, [uuid.v4(), name, email, await bcrypt.hash(password, 10), phone, address, role]);
    return response.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
}

const createProduct = async ({ name, description, price, brand, category, gender, size, color, stock, image_urls }) => {
  try {
    const SQL = `INSERT INTO products(id, name, description, price, brand, category, gender, size, color, stock, image_urls, created_at, updated_at)
    values($1, $2, $3, $4, $5, $6, $7,$8, $9, $10,$11, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL, [uuid.v4(), name, description, price, brand, category, gender, JSON.stringify(size), color, stock, image_urls]);
    // return products.rows;
    return response.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }

}

const authenticate = async ({ email, password }) => {
  const SQL = `SELECT id, email,password FROM users WHERE email=$1; `;
  const response = await client.query(SQL, [email]);
  console.log("Password entered:", password);
  console.log("Stored hashed password:", response.rows[0].password);

  if (!response.rows.length || !(await bcrypt.compare(password, response.rows[0].password))) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  console.log('before token generation', response.rows[0].id);
  const token = jwt.sign({ id: response.rows[0].id }, JWT);
  console.log(token, 'token')
  return { token };
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
    console.log('Decoded Payload:', payload);  // 
  } catch (ex) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, email FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async () => {
  try {
    const SQL = `SELECT id, name FROM users;`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
 
};

const fetchProducts = async () => {
  try {
    const SQL = `SELECT * FROM products LIMIT 8; `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
 
};

const fetchSingleProduct = async (id) => {
  try {
    const { rows } = await client.query('SELECT * FROM products WHERE id = $1::UUID', [id]);
    return rows[0]; // Return the first (and only) product found
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const updateProduct = async (id) => {
  try {
          // SQL query to update the product in the database
          const result = await client.query(
              `UPDATE products SET name = $1, description = $2, price = $3, image_urls = $4, stock = $5
              WHERE id = $6 RETURNING *`, [name, description, price, image_urls, stock, id] );
  
          if (result.rows.length === 0) {
              return res.status(404).json({ message: 'Product not found.' });
          }
          return result.rows[0]; // Return updated product
      } catch (ex) {
          next(ex)
          console.error(err.message);
          res.status(500).send('Server Error');
      }
}
const deleteProduct = async ({ id }) => {
  try {
    const SQL = ` DELETE FROM products WHERE id=$1`;
    await client.query(SQL, [user_id, id]);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
  
};
module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  fetchUsers,
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  authenticate,
  findUserWithToken

};