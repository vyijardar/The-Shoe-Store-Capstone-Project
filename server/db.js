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
    size JSON,
    color VARCHAR(50),
    stock INT DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `;
    await client.query(SQL);

}

const createUser = async ({ name, email, password, phone, address, role = 'customer' }) => {
    const SQL = `INSERT INTO users(id, name, email, password, phone, address, role, created_at, updated_at) 
                    values($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL, [uuid.v4(), name, email, await bcrypt.hash(password, 10), phone, address, role]);
    return response.rows[0];
}

const  createProduct = async ({name, description, price, brand, category, size, color, stock, image_url}) => {
    const SQL = `INSERT INTO products(id, name, description, price, brand, category, size, color, stock, image_url, created_at, updated_at)
                values($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL,[uuid.v4(), name,  description, price, brand, category, JSON.stringify(size), color, stock, image_url]);
     // return products.rows;
   return response.rows;
}

const fetchUsers = async () => {
    const SQL = `
      SELECT id, name FROM users;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const fetchProducts = async () => {
    const SQL = `
      SELECT * FROM products;
    `;
    const response = await client.query(SQL);
    return response.rows;
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
const deleteProduct = async ({ user_id, id }) => {
  const SQL = `
    DELETE FROM products WHERE user_id=$1 AND id=$2
  `;
  await client.query(SQL, [user_id, id]);
};
module.exports = {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProducts,
    fetchSingleProduct,
    deleteProduct
};