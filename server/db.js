require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/shoe_store_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT= process.env.JWT_SECRET || 'your_jwt_secret'
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
     DROP TABLE IF EXISTS order_items CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    CREATE TABLE users (
    id UUID PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
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

    CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255),
    total DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255),
    quantity INT,
    price DECIMAL(10, 2));
    `;
  await client.query(SQL);

}

const createUser = async ({ firstname, lastname, email, password,  role = 'customer' }) => {
  try {
    
    const SQL = `INSERT INTO users(id, firstname,lastname, email, password, role, created_at, updated_at) 
                  values($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL, [uuid.v4(), firstname, lastname, email, await bcrypt.hash(password, 10), role]);
    console.log('Query result:', response.rows[0]);
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

async function findUserByEmail(email, password) {
  const SQL = `SELECT id, email, password, role FROM users WHERE email = $1`;
  const normalizedEmail = email.trim().toLowerCase();
  const result = await client.query(SQL, [normalizedEmail]);

  console.log("Query result:", result.rows);
  if (result.rows.length === 0) {
      throw new Error('User not found');
  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
      throw new Error('Invalid password');
  }

  const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT // Make sure this is defined
  );
  
  console.log("Generated token:", token);
  console.log("Returning user:", user);  // Ensure user info is logged correctly

  return { token, user };  // Ensure both are returned
}
async function adminDetails() {
  const SQL =`SELECT id, email, firstname, lastname, role FROM users`;
  const result = await client.query(SQL);
  console.log('Query result:', result.rows);
  return result.rows;
}
// Utility function to generate a JWT token
function generateToken(user) {
  return jwt.sign(
      { id: user.id, email: user.email, role: user.role },JWT );
}
async function findUserById(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  try {
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
          return null;  // User not found
      }
      return result.rows[0];  // Return the user data
  } catch (error) {
      console.error('Database error:', error.message);
      throw new Error('Database query failed');
  }
}

const fetchUsers = async () => {
  try {
    const SQL = `SELECT id, firstname, lastname FROM users;`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
 
};
const updateUser = async ({ userId, phone, address }) => {
  try {
      // SQL query to update the user's phone and address during checkout
      const SQL = `UPDATE users 
                   SET phone = $1, address = $2, updated_at = NOW() 
                   WHERE id = $3 RETURNING *`;

      // Execute the query
      const response = await client.query(SQL, [phone, address, userId]);

      // Return the updated user data
      return response.rows[0];
  } catch (error) {
      console.error("Error updating user during checkout:", error);
      throw new Error('Failed to update user during checkout');
  }
};

async function getAdminByEmail(email) {
  try {
    // Define the query to get the user with the provided email and role 'admin'
    const query = 'SELECT * FROM users WHERE email = $1 AND role = $2';
    const values = [email, 'admin'];  // The email provided by the client and the role 'admin'

    // Execute the query
    const result = await client.query(query, values);

    // If no user is found
    if (result.rows.length === 0) {
      return null;  // Return null if no admin user is found
    }

    // Return the first user found (admin)
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching admin by email:', error);
    throw new Error('Database query failed');
  }
}

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
  deleteProduct,
  updateProduct,
  updateUser,
  getAdminByEmail,
  findUserByEmail,
  findUserById,
  generateToken,
  adminDetails
};