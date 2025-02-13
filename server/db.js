require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/shoe_store_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT_SECRET || 'your_jwt_secret'
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS order_items CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TYPE IF EXISTS user_role;
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
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
    size TEXT[],
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

const createUser = async ({ firstname, lastname, email, password, role = 'customer' }) => {
  try {

    const SQL = `INSERT INTO users(id, firstname,lastname, email, password, role, created_at, updated_at) 
                  values($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`;
    const response = await client.query(SQL, [uuid.v4(), firstname, lastname, email, await bcrypt.hash(password, 10), role]);
    return response.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
}

const createProduct = async ({ name, price, description, brand, category, gender, size, color, stock, image_urls }) => {
  try {
    // Allowed gender values
    const normalizedGender = gender.toLowerCase(); // Normalize input
    const validGenders = ['men', 'women', 'unisex']; // Allowed values

    if (!validGenders.includes(normalizedGender)) {
      throw new Error(`Invalid gender value: '${gender}'. Allowed values: men, women, unisex`);
    }


    const SQL = `
          INSERT INTO products (name, price, description, brand, category, gender, size, color, stock, image_urls)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
      `;

    const response = await client.query(SQL, [
      name,
      price,
      description,
      brand,
      category,
      normalizedGender,  // Ensure gender is properly formatted
      size,
      color,
      stock,
      image_urls
    ]);

    return response.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};


async function findUserByEmail(email, password) {
  const SQL = `SELECT id, email, password, role FROM users WHERE email = $1`;
  const normalizedEmail = email.trim().toLowerCase();
  const result = await client.query(SQL, [normalizedEmail]);

 
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },JWT );
  return { token, user }; 
}
async function adminDetails() {
  const SQL = `SELECT id, email, firstname, lastname, role FROM users`;
  const result = await client.query(SQL);
  return result.rows;
}
// Utility function to generate a JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role }, JWT);
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
const updateUser = async ({ userId,email, phone, address,role }) => {
  try {
    const SQL = `UPDATE users 
    SET email = $1, phone = $2, address = $3, role = $4, updated_at = NOW() 
    WHERE id = $5 
    RETURNING *`;

    const response = await client.query(SQL, [email, phone, address, role, userId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error('Failed to update user');
  }
};
const deleteUser = async (id) => {
  try {
    const SQL = `DELETE FROM users WHERE id = $1 RETURNING *`;
    const response = await client.query(SQL, [id]);

    if (response.rows.length === 0) {
      throw new Error('User not found');
    }
    return response.rows[0]; 
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error('Failed to delete user');
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
    return rows[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const updateProduct = async (id,productData) => {
  try {
    const { name, price, description, brand, category, gender, size, color, stock, image_urls } = productData;
    // const sizeArray = Array.isArray(size) ? size : size.split(",");
    const result = await client.query(
      `UPDATE products 
       SET name = $1, price = $2, description = $3, brand = $4, category = $5, 
           gender = $6, size = $7, color = $8, stock = $9, image_urls = $10
       WHERE id = $11 RETURNING *`,
      [name, price, description, brand, category, gender, size, color, stock, image_urls, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return result.rows[0]; // Return updated product
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
}
const deleteProduct = async ({ id }) => {
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const SQL = ` DELETE FROM products WHERE id=$1`;
    await client.query(SQL, [ id]);
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
  deleteUser,
  getAdminByEmail,
  findUserByEmail,
  findUserById,
  generateToken,
  adminDetails
};