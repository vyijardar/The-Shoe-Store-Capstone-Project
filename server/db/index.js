require('dotenv').config();
const {
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
    adminDetails
} = require('../db');

const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkAdmin, isLoggedIn } = require('../middleware/auth');

app.use(express.json());
app.use(cors());
app.use(require('morgan')('dev'))


//for deployment only
const path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

//Admin Dashboard
app.get('/api/admin/dashboard', isLoggedIn, checkAdmin, async (req, res) => {
    try {
        const user = await adminDetails(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            id: user.id,
            email: user.email,
            firstname: user.firstname,   // Ensure these columns exist in your database
            lastname: user.lastname,
            role: user.role,
        });

    } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
        next(err);
    }
});

//View all users on admin dashboard
app.get('/api/admin/users', isLoggedIn, checkAdmin, async (req, res) => {
    try {
        const users = await adminDetails();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.json(users);

    } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
        next(err);
    }
});

//Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Call the getAdminByEmail function to check for an admin user
        const admin = await getAdminByEmail(email);

        // If admin is not found
        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token with user details
        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET, // Use environment variable for your secret
            { expiresIn: '1h' }
        );

        // Send the token to the client
        res.status(200).json({
            message: 'Login successful',
            token,
            role: admin.role,
        });
    } catch (ex) {
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});


// Update user information
app.put('/api/admin/users/:id', isLoggedIn, checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { email, phone, address, role} = req.body; // Adjust fields as needed

    try {
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only allow admins to change role
        if (role && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can change user roles' });
        }

        const updatedUser = await updateUser({ userId: id, email, phone, address, role });
        return res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
//Delete User on admin   
app.delete("/api/admin/users/:id", checkAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await deleteUser(id);
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Fetch User account details
app.get('/api/auth/me', isLoggedIn, async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: "Invalid token: User ID missing" });
        }
        const user = await findUserById(req.user.id);


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            firstname: user.firstname,   // Ensure these columns exist in your database
            lastname: user.lastname,
            phone: user.phone,
            address: user.address,
        });
    } catch (ex) {
        console.error("Error fetching account info:", ex);
        next(ex);  // Pass error to error handler
    }
});
//User and admin Login
app.post('/api/auth/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const { token, user } = await findUserByEmail(email, password);  
       
        res.json({ token, user });

    } catch (err) {

   
        if (err.message === "User not found" || err.message === "Invalid password") {
            res.status(401).json({ error: err.message }); 
        } else {
            res.status(500).json({ error: "Internal server error" }); 
        }
    }
});
//Search Result Query
app.get('/api/products/search', async (req, res) => {
    const query = req.query.q; 
    
    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const results = await client.query(
            `SELECT * FROM products WHERE 
             name ILIKE $1 OR 
             gender ILIKE $1 OR 
             category ILIKE $1 OR 
             description ILIKE $1`,
            [`%${query}%`]
        );
        res.json(results.rows);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//User Logout
app.post('/api/users/logout', async (req, res, next) => {
    try {
        res.json({ message: 'Logged out successfully' });
    }
    catch (ex) {
        next(ex);
    }
});

//Register user
app.post('/api/users', async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        // Basic validation to ensure name, email, and password are present
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        // You can add more validation for email format and password length here
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }

        // Create the user (you can replace this with your own user creation logic)
        const user = await createUser({
            firstname,
            lastname,
            email,
            password,
            role: role || 'customer',
        });

        // Generate a JWT token for the created user
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (ex) {
        console.error(ex);
        next(ex);
    }
});

//Fetch products
app.get('/api/products', async (req, res, next) => {
    try {

        const products = await fetchProducts();
        res.json(products);
    }
    catch (ex) {
        next(ex);
    }
});
//Fetch men products
app.get("/api/products/men", async (req, res, next) => {
    try {

        const result = await client.query("SELECT * FROM products WHERE gender = 'men'");

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json([]); // Return an empty array if no products
        }

        res.json(result.rows); // Always return an array
    } catch (ex) {
        console.error("Database error:", ex.message);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});
//Fetch women products
app.get("/api/products/women", async (req, res, next) => {
    try {
        const result = await client.query("SELECT * FROM products WHERE gender = 'women'");
        res.json(result.rows);
    } catch (ex) {
        next(ex);
        res.status(500).send("Server Error");
    }
});

//Fetch Single Product
app.get('/api/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await fetchSingleProduct(req.params.id); // Replace with your database logic
       
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (ex) {
        next(ex);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});

//Add new product
app.post('/api/products/addproduct', isLoggedIn, checkAdmin, async (req, res, next) => {
    try {
    
        let { name, description, price, brand, category, gender, size, color, stock, image_urls } = req.body;

        if (!name || !price || !category || !description || !brand || !gender || !size || !color || !stock || !image_urls) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (typeof size === "string") {
            size = size.split(",").map((s) => s.trim());
        }

        if (!Array.isArray(image_urls)) {
            image_urls = [image_urls];
        }

        const newProduct = await createProduct({ name, description, price, brand, category, gender, size, color, stock, image_urls });

        if (!newProduct) {
            return res.status(500).json({ error: "Failed to create product" });
        }

        return res.status(201).json(newProduct); // Ensure this sends a valid product
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Update existing product
app.put('/api/products/:id', checkAdmin, async (req, res, next) => {
    const id = req.params.id;
    const { name, price, description, brand, category, gender, size, color, stock, image_urls } = req.body;

    // Input validation (optional, you can enhance this)
    if (!name || !price || !stock) {
        return res.status(400).json({ message: 'Name, price, and stock are required.' });
    }
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
        return res.status(400).json({ error: 'At least one valid image URL is required.' });
    }

    // Convert size array to a comma-separated string for storage
    // const sizeString = Array.isArray(size) ? size : size?.split(",");

    try {
        const product = await updateProduct(id, {
            name,
            price,
            description,
            brand,
            category,
            gender,
            size,
            color,
            stock,
            image_urls
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

//Delete product
app.delete('/api/products/:id', checkAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteProduct({ id });
        res.sendStatus(204);
    } catch (ex) {
        next(ex)
    }
});


//Fetch all orders
app.get('/api/orders', checkAdmin, async (req, res) => {
    try {
        // Query the database for orders by user ID
        const result = await client.query(
            `SELECT orders.id, orders.order_date, orders.status, orders.total, order_items.product_name, order_items.quantity, order_items.price
             FROM orders
             LEFT JOIN order_items ON orders.id = order_items.order_id
             WHERE orders.user_id = $1`,
            [req.user.userId] // Use the user ID from the decoded JWT
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user.' });
        }

        const orders = result.rows.reduce((acc, row) => {
            // Group items by order ID
            const existingOrder = acc.find(order => order.id === row.id);
            if (existingOrder) {
                existingOrder.items.push({
                    product: row.product_name,
                    quantity: row.quantity,
                    price: row.price,
                });
            } else {
                acc.push({
                    id: row.id,
                    date: row.order_date,
                    status: row.status,
                    total: row.total,
                    items: [{
                        product: row.product_name,
                        quantity: row.quantity,
                        price: row.price,
                    }],
                });
            }
            return acc;
        }, []);

        res.status(200).json(orders); // Send the order history to the client
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Update user details at checkout
app.post('/api/checkout', async (req, res, next) => {
    try {
        const { userId, phone, address } = req.body;

        // Basic validation to ensure phone and address are provided
        if (!phone || !address) {
            return res.status(400).json({ error: 'Phone and address are required.' });
        }

        // Update the user with phone and address during checkout
        const updatedUser = await updateUser({
            userId,
            phone,
            address
        });

        res.status(200).json({
            message: 'Checkout successful',
            user: {
                id: updatedUser.id,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role
            }
        });
    } catch (ex) {
        console.error(ex);
        next(ex);  // Pass the error to the error handler
    }
});


app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

const init = async () => {
    const port = process.env.PORT || 3001;
    await client.connect();
    await createTables();
    await Promise.all([
        createUser({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: 'securepassword123',
            role: 'customer',
        }),
        createUser({
            firstname: 'Alice',
            lastname: 'Smith',
            email: "alice@example.com",
            password: "strongpassword123",
            role: "customer"
        }),
        createUser({
            firstname: 'Emily',
            lastname: 'Smith',
            email: "emilysmith@example.com",
            password: "emilysmith123",
            role: "customer"
        }),
        createUser({
            firstname: 'Robert',
            lastname: 'Johnson',
            email: "robert@example.com",
            password: "adminpassword123",
            role: "admin"
        }),
        await createUser({
            firstname: 'Admin',
            lastname: 'User',
            email: "admin@example.com",
            password: "adminpassword123",
            role: "admin"
        }),
        await createUser({
            firstname: 'Delete',
            lastname: 'User',
            email: "delete@example.com",
            password: "adminpassword123",
            role: "customer"
        }),
        await createUser({
            firstname: 'Update',
            lastname: 'User',
            email: "customer@example.com",
            password: "adminpassword123",
            role: "admin"
        })
    ]);

   await fetchUsers();

    await Promise.all([
        createProduct({
            name: "Nike C1TY “Safety Cone",
            description: "Nike C1TY is engineered to overcome anything the city throws your way. A mesh upper keeps the fit breathable, while the reinforced sides and toe box help protect your feet from the elements. This edition pulls color inspiration from safety cones—giving street style a whole new meaning.",
            price: 100.00,
            brand: "Nike",
            category: "Casual Sneakers",
            gender: 'men',
            size: [6, 6.5, 7, 7.5, 11.5, 12, 12.5, 13, 13.5],
            color: "Grey",
            stock: 50,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/333b552e-d034-4356-a452-290940b9b544/NIKE+C1TY.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/48e83974-41a3-4645-a656-e26ce3fcbafa/NIKE+C1TY.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/76065f6b-f429-4b8a-8a18-38b13cb444b0/NIKE+C1TY.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/979ccbfa-2db6-42dc-92ab-153d6f93c3cc/NIKE+C1TY.png'
            ]
        }),
        createProduct({
            name: "Nike Pegasus Plus",
            description: "Take responsive cushioning to the next level with the Pegasus Plus. It energizes your ride with full-length, superlight ZoomX foam to give you a high level of energy return for everyday runs. And a stretchy Flyknit upper conforms to your foot for a seamless fit.",
            price: 180.00,
            brand: "Nike",
            category: "Running Shoes",
            gender: 'men',
            size: [6],
            color: "Red",
            stock: 35,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f69625b-436f-4fa4-b1b5-a44b1d01e924/PEGASUS+PLUS.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2526ce66-3ed8-4d07-ad5e-0d9919f62550/PEGASUS+PLUS.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6e8a5585-c45c-4f4d-8338-4964437aadc7/PEGASUS+PLUS.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f061d2e0-ab8d-4e0d-b1e4-97e4b1e60d7f/PEGASUS+PLUS.png'
            ]
        }),
        createProduct({
            name: "Nike Structure 25",
            description: "Smart formal shoes designed for all-day comfort with a sleek appearance.",
            price: 140.00,
            brand: "Nike",
            category: "Running Shoes",
            gender: 'men',
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 12.5, 13, 13.5],
            color: "Blue",
            stock: 20,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/004e73a9-1210-4366-9660-ab47dec9ee92/NIKE+AIR+ZOOM+STRUCTURE+25.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c0300458-237e-4b92-9bcf-1f08480539a8/NIKE+AIR+ZOOM+STRUCTURE+25.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/62a92143-b32f-4850-9847-6419ac519b0b/NIKE+AIR+ZOOM+STRUCTURE+25.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bfd7a14a-8876-479c-ad33-67fba24a9a65/NIKE+AIR+ZOOM+STRUCTURE+25.png'
            ]
        }),
        createProduct({
            name: "Nike Court Shot",
            description: "This low-profile shoe is a minimalist's staple. Its synthetic leather upper creates a classic look, while the stitching and textured Swoosh logo add just the right amount of elevated detail.",
            price: 130.00,
            brand: "Nike",
            category: "Running Shoes",
            gender: 'men',
            size: [6, 6.5, 7, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 13, 13.5],
            color: "White",
            stock: 18,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4c393d16-9423-400f-ab5e-e78e50fe5e01/COURT+SHOT.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0049d603-5df2-4309-a7bb-0a4e76d18dad/COURT+SHOT.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ece4727d-4e50-4dc0-8f76-962ecbe9dd5d/COURT+SHOT.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5e3a0f26-7f19-420d-8dc5-24ea9dfc4371/COURT+SHOT.png'
            ]
        }),
        createProduct({
            name: "Nike Dunk Low Next Nature",
            description: "You can always count on a classic. The Dunk Low pairs its iconic color blocking with premium materials and plush padding for game-changing comfort that lasts. The styling possibilities are endless—how will you wear your Dunks?",
            price: 115.00,
            brand: "Nike",
            category: "Casual Sneakers",
            gender: 'women',
            size: [6, 6.5, 7, 7.5, 8, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
            color: "Pink",
            stock: 50,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bdcf3baa-788b-49bf-89ab-6a1369f89853/W+NIKE+DUNK+LOW+NEXT+NATURE.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1f36c17b-f981-46ca-9495-52771be4350b/W+NIKE+DUNK+LOW+NEXT+NATURE.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e746c673-5b0e-4c16-b604-0694a2dbacf0/W+NIKE+DUNK+LOW+NEXT+NATURE.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/310394a6-99fe-4e7c-bf7a-0098489e22dc/W+NIKE+DUNK+LOW+NEXT+NATURE.png'
            ]
        }),
        createProduct({
            name: "Nike Pegasus Premium",
            description: "The Pegasus Premium supercharges responsive cushioning with a triple stack of our most powerful running technologies: ZoomX foam, a sculpted Air Zoom unit and ReactX foam. It’s the most responsive Pegasus ever, providing high energy return unlike any other. With a lighter-than-air upper, it decreases weight and increases breathability so you can fly faster.",
            price: 210.00,
            brand: "Nike",
            category: "Running Shoes",
            gender: 'women',
            size: [6, 6.5, 7, 7.5, 8, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
            color: "White",
            stock: 35,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90a79d88-09f4-4a2a-918c-8c68da454754/W+NIKE+PEGASUS+PREMIUM.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/efb6349f-5a1e-40d6-bb3b-574ce5dd8512/W+NIKE+PEGASUS+PREMIUM.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/980cbb8b-c491-48f2-88f6-865f124a15c7/W+NIKE+PEGASUS+PREMIUM.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c719a657-d060-41a7-bc57-522388f25971/W+NIKE+PEGASUS+PREMIUM.png'
            ]
        }),
        createProduct({
            name: "Nike Reina EasyOn",
            description: "Smart formal shoes designed for all-day comfort with a sleek appearance.",
            price: 140.00,
            brand: "Nike",
            category: "Casual Shoes",
            gender: 'women',
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
            color: "Brown",
            stock: 10,
            image_urls: [
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ac770c0-2875-417a-b085-67bece84479a/NIKE+REINA+EASYON.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/073126e2-20a7-41a1-bf0f-3b34cea86342/NIKE+REINA+EASYON.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bf979b3b-e405-496e-a6d9-d17e119d1115/NIKE+REINA+EASYON.png',
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a7e21f02-5c7b-4d9f-83b7-bdf4c83f9fcc/NIKE+REINA+EASYON.png'
            ]
        }),
        createProduct({
            name: "Better Foam Prowl Women's Slip-On Wide Shoes",
            description: "SoftFoam+: PUMA's comfort sockliner for instant step-in and long-lasting comfort that provides soft cushioning every step of your day",
            price: 38.99,
            brand: "Puma",
            category: "Casual Shoes",
            gender: 'women',
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 11, 11.5, 12, 12.5, 13, 13.5],
            color: "Black",
            stock: 20,
            image_urls: [
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/376927/02/sv01/fnd/PNA/fmt/png/Better-Foam-Prowl-Slip-On-Wide-Women's-Training-Shoes",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/376927/02/fnd/PNA/fmt/png/Better-Foam-Prowl-Slip-On-Wide-Women's-Training-Shoes",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/376927/02/bv/fnd/PNA/fmt/png/Better-Foam-Prowl-Slip-On-Wide-Women's-Training-Shoes",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/376927/02/sv02/fnd/PNA/fmt/png/Better-Foam-Prowl-Slip-On-Wide-Women's-Training-Shoes"
            ]
        }),
        createProduct({
            name: "Speedcat OG Women's Sneakers",
            description: "SoftFoam+: PUMA's comfort sockliner for instant step-in and long-lasting comfort that provides soft cushioning every step of your day",
            price: 100.00,
            brand: "Puma",
            category: "Sneakers",
            gender: 'women',
            size: [6, 6.5, 7, 8, 8.5, 9.5, 10.5, 11, 11.5, 12.5, 13, 13.5],
            color: "Red",
            stock: 15,
            image_urls: [
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/400986/02/sv01/fnd/PNA/fmt/png/Speedcat-OG-Women's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/400986/02/sv02/fnd/PNA/fmt/png/Speedcat-OG-Women's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/400986/02/bv/fnd/PNA/fmt/png/Speedcat-OG-Women's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/400986/02/sv04/fnd/PNA/fmt/png/Speedcat-OG-Women's-Sneakers"
            ]
        }),
        createProduct({
            name: "PUMA Caven 2.0 Lux SD Sneakers",
            description: "SoftFoam+: PUMA's comfort sockliner for instant step-in and long-lasting comfort that provides soft cushioning every step of your day",
            price: 30.99,
            brand: "Puma",
            category: "Sneakers",
            gender: 'men',
            size: [6, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11.5, 12, 12.5,],
            color: "Red",
            stock: 17,
            image_urls: [
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/395080/05/sv01/fnd/PNA/fmt/png/PUMA-Caven-2.0-Lux-SD-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/395080/05/bv/fnd/PNA/fmt/png/PUMA-Caven-2.0-Lux-SD-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/395080/05/sv02/fnd/PNA/fmt/png/PUMA-Caven-2.0-Lux-SD-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/395080/05/sv04/fnd/PNA/fmt/png/PUMA-Caven-2.0-Lux-SD-Sneakers"
            ]
        }),
        createProduct({
            name: "Suede XL Alien",
            description: "SOFTFOAM+: Step-in comfort sockliner designed to provide soft cushioning thanks to its extra thick heel",
            price: 110.00,
            brand: "Puma",
            category: "Sneakers",
            gender: 'men',
            size: [6, 6.5, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5],
            color: "White",
            stock: 27,
            image_urls: [
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/402245/01/sv01/fnd/PNA/fmt/png/Suede-XL-Alien-Men's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/402245/01/fnd/PNA/fmt/png/Suede-XL-Alien-Men's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/402245/01/sv02/fnd/PNA/fmt/png/Suede-XL-Alien-Men's-Sneakers",
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/402245/01/sv04/fnd/PNA/fmt/png/Suede-XL-Alien-Men's-Sneakers"
            ]
        }),
        createProduct({
            name: "Samba Messi Indoor Soccer Shoes",
            description: "When the biggest games are on the line, you can count on Lionel Messi to deliver. Represent the Argentine's on-pitch passion from beyond the touchline in these comfortable adidas Samba soccer cleats. Showing off player details, this 3-Stripes classic includes a signature leather upper and grippy rubber outsole.",
            price: 110.00,
            brand: "Adidas",
            category: "Soccer Shoes",
            gender: 'men',
            size: [6, 6.5, 7, 7.5, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
            color: "Light Pink",
            stock: 27,
            image_urls: [
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/51628ba20fa34a4392850df532dad096_9366/Samba_Messi_Indoor_Soccer_Shoes_Pink_JP7844_01_00_standard.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/28ba5ed00330464a9ebedb0ea304fa20_9366/Samba_Messi_Indoor_Soccer_Shoes_Pink_JP7844_03_standard.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/90ce0dd83182472aa4f8edbf778818b7_9366/Samba_Messi_Indoor_Soccer_Shoes_Pink_JP7844_02_standard.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e29251bf77a0499586315e09b77b9af6_9366/Samba_Messi_Indoor_Soccer_Shoes_Pink_JP7844_22_model.jpg"
            ]
        }),
        createProduct({
            name: "Nizza Platform Shoes",
            description: "What do skinny jeans and flowy skirts have in common? Both look fantastic with a trendy platform like these adidas Nizza shoes. Step up, step out and give every outfit a little lift. Even if you're just knocking around town.",
            price: 56.00,
            brand: "Adidas",
            category: "Casual Shoes",
            gender: 'women',
            size: [6, 6.5, 7.5, 8, 8.5, 9.5, 10, 11.5, 12, 12.5, 13],
            color: "Core Black ",
            stock: 7,
            image_urls: [
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/eec160da7d2f41d1bd6aabeb0009028d_9366/Nizza_Platform_Shoes_Black_FV5321_01_standard.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fe18a06312a04606b34cabeb0008e24e_9366/Nizza_Platform_Shoes_Black_FV5321_02_standard_hover.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f77cd40f57ed40d5925aabef014f08c5_9366/Nizza_Platform_Shoes_Black_FV5321_03_standard.jpg",
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/8495b33541cd4dd78089abeb000ad522_9366/Nizza_Platform_Shoes_Black_FV5321_04_standard.jpg"
            ]
        }),


    ])
    await fetchProducts();
    app.listen(port);
};
init();