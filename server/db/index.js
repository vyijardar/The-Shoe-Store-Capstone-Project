const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProducts,
    fetchSingleProduct,
    createProduct,
    deleteProduct,
    authenticate,
    findUserWithToken,
    updateProduct
} = require('../db');

const express = require('express');
const app = express();
const { checkAdmin } = require('../middleware/auth');
app.use(express.json());

const cors = require('cors');
app.use(cors());
app.use(require('morgan')('dev'))
//for deployment only
const path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));


const isLoggedIn = async (req, res, next) => {
    try {
        req.user = await findUserWithToken(req.headers.authorization);
        next();
    } catch (ex) {
        next(ex);
    }
}

app.post('/api/auth/login', async (req, res, next) => {
    try {
        // res.send(await authenticate(req.body));
        const { email, password } = req.body;
        const { token } = await authenticate({ email, password });
        res.json({ token });
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/api/auth/me', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await findUserWithToken(req.headers.authorization));
    }
    catch (ex) {
        next(ex);
    }
});

// Log out the user (client should handle token removal)
app.post('/api/auth/logout', async (req, res, next) => {
    try {
        res.json({ message: 'Logged out successfully' });
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/api/users', async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/api/products', async (req, res, next) => {
    try {

        res.send(await fetchProducts());
        res.json(products);
    }
    catch (ex) {
        next(ex);
    }
});
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

app.get("/api/products/women", async (req, res, next) => {
    try {
        const result = await client.query("SELECT * FROM products WHERE gender = 'women'");
        res.json(result.rows);
    } catch (ex) {
        next(ex);
        res.status(500).send("Server Error");
    }
});
app.get('/api/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await fetchSingleProduct(req.params.id); // Replace with your database logic
        console.log(`Fetching product with ID: ${id}`);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (ex) {
        next(ex);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});
app.post('/api/products/addproduct',checkAdmin, async (req, res, next) => {
    try {
        const { name, description, price, brand, category, gender, size, color, stock, image_urls } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Name, price, and category are required.' });
        }
        const product = await createProduct({ name, description, price, brand, category, gender, size, color, stock, image_urls });
        res.status(201).json(product);
    } catch (ex) {
        next(ex);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Update an existing product (Admin only)
app.put('/api/products/:id', checkAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, image_urls, stock } = req.body;

    // Input validation (optional, you can enhance this)
    if (!name || !price || !stock) {
        return res.status(400).json({ message: 'Name, price, and stock are required.' });
    }
    try {
        const product = await updateProduct(id, { name, description, price, image_urls, stock });
        res.json(product); 
    } catch (err) {
        next(err); 
    }
});
app.delete('/api/products/:id',checkAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteProduct({ id });
        res.sendStatus(204);
    } catch (ex) {
        next(ex)
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

const init = async () => {
    const port = process.env.PORT || 3001;
    await client.connect();
    console.log('connected to database');

    await createTables();
    console.log('tables created');

    await Promise.all([
        createUser({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword123',
            phone: '123-456-7890',
            address: '123 Main St, City, Country',
            role: 'customer',
        }),
        createUser({
            name: "Alice Smith",
            email: "alice@example.com",
            password: "strongpassword123",
            phone: "321-654-9870",
            address: "789 Another Road, City, Country",
            role: "customer"
        }),
        createUser({
            name: "Robert Johnson",
            email: "robert@example.com",
            password: "adminpassword123",
            phone: "555-123-4567",
            address: "101 Admin St, Admin City, Country",
            role: "admin"
        }),
    ]);
    const users = await fetchUsers();
    console.log('users created', users);
    console.log(await fetchUsers());
    await Promise.all([
        createProduct({
            name: "Nike C1TY “Safety Cone",
            description: "Nike C1TY is engineered to overcome anything the city throws your way. A mesh upper keeps the fit breathable, while the reinforced sides and toe box help protect your feet from the elements. This edition pulls color inspiration from safety cones—giving street style a whole new meaning.",
            price: 100.00,
            brand: "Nike",
            category: "Casual Sneakers",
            gender: 'men',
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            brand: "Clarks",
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
            size: [6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
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
    const products = await fetchProducts();
    console.log(products);

    app.listen(port, () => console.log(`listening on port ${port}`));
};
init();