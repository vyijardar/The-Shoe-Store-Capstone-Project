import { useState } from "react";

export default function  CreateProduct  ()  {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        gender: "unisex",
        size: [],
        color: "",
        stock: "",
        image_urls: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSizeChange = (e) => {
        setFormData({ ...formData, size: e.target.value.split(",") });
    };

    const handleImageUrlsChange = (e) => {
        setFormData({ ...formData, image_urls: e.target.value.split(",") });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to add product");

            alert("Product added successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                brand: "",
                category: "",
                gender: "unisex",
                size: [],
                color: "",
                stock: "",
                image_urls: []
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                </select>
                <input type="text" name="size" placeholder="Sizes (comma separated)" onChange={handleSizeChange} />
                <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
                <input type="text" name="image_urls" placeholder="Image URLs (comma separated)" onChange={handleImageUrlsChange} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

