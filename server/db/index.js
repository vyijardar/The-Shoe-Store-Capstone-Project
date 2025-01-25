
const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProducts,
    fetchSingleProduct,
    deleteProduct
} = require('../db');
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());  
app.use(require('morgan')('dev'))
//for deployment only
const path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');  // Allow any origin (you can restrict it to specific origins)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
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
        res.setHeader('Content-Type', 'application/json');
        res.send(await fetchProducts());
        res.json(products);
    }
    catch (ex) {
        next(ex);
    }
});
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await fetchSingleProduct(req.params.id); // Replace with your database logic
        console.log(`Fetching product with ID: ${id}`);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});
app.delete('/api/users/:user_id/products/:id', async (req, res, next) => {
    try {
        await deleteProduct({
            user_id: req.params.user_id,
            id: req.params.id,
        });
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
    const port = process.env.PORT || 3000;
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
            name: "Nike Air Zoom Pegasus 39",
            description: "Lightweight and breathable running shoes designed for comfort and speed.",
            price: 120.99,
            brand: "Nike",
            category: "Running Shoes",
            size: [7, 8, 9, 10, 11],
            color: "Black/White",
            stock: 50,
            image_url: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/a13c263c-12b7-499f-9f77-848cd0600cf4/NIKE+INTERACT+RUN.png"
        }),
        createProduct({
            name: "Adidas Ultraboost 22",
            description: "Comfortable casual sneakers with a stylish design, perfect for daily wear.",
            price: 180.00,
            brand: "Adidas",
            category: "Casual Sneakers",
            size: [6, 7, 8, 9, 10],
            color: "Grey",
            stock: 35,
            image_url: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/ad2f4fc4c9e64c7cad0aae3000cb8676_9366/GW9261_01_standard.jpg"
        }),
        createProduct({
            name: "Clarks Tilden Walk",
            description: "Smart formal shoes designed for all-day comfort with a sleek appearance.",
            price: 90.00,
            brand: "Clarks",
            category: "Formal Shoes",
            size: [8, 9, 10, 11],
            color: "Brown",
            stock: 20,
            image_url: "https://images.dsw.com/is/image/DSWShoes/334363_003_ss_01?impolicy=qlt-medium-high&imwidth=640&imdensity=1"
        })
    ])
    const products = await fetchProducts();
    console.log(products);

    app.listen(port, () => console.log(`listening on port ${port}`));
};
init();