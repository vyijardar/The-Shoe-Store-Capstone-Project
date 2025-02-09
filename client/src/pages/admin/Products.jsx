import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import "../../css/Spinner.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:3001/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const openModal = (type, product = null) => {
    setModalType(type);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async (product) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      console.log("Admin Token Before Sending:", token);

      if (!token) {
        console.error("Admin token is missing!");
        return;
      }

      console.log("Product Data Before Sending:", product);
      let response, newProduct;

      if (modalType === "Add") {
        response = await fetch("http://localhost:3001/api/products/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(product),
        });
      
      } else if (modalType === "Edit") {
        response = await fetch(`http://localhost:3001/api/products/${currentProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(product),
        });

      }

      const rawData = await response.text();
      console.log("Raw Response:", rawData);

      try {
        newProduct = JSON.parse(rawData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }

      console.log("Parsed Product Data:", newProduct);

      if (!newProduct || !newProduct.id) {
        console.error("Invalid product data received:", newProduct);
        return;
      }

      setProducts((prevProducts) =>
        modalType === "Add"
          ? [...prevProducts, newProduct]
          : prevProducts.map((p) => (p.id === newProduct.id ? newProduct : p))
      );
    alert("Product saved successfully");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setProducts(products.filter((product) => product.id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }

  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="product-management">
      <h2>Manage Products</h2>
      <button className="add-product-btn" onClick={() => openModal("Add")}>
        Add Product
      </button>
      <table className="table mt-3 product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Image URL</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td className="scrollable-cell">{product.description}</td>
              <td>${product.price}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.gender}</td>
              <td>{product.size?.join(", ") || "No sizes available"}</td>
              <td>{product.color}</td>
              <td>{product.stock}</td>
              <td className="scrollable-cell">
                {product.image_urls?.join(", ") || "No images available"}
              </td>
              <td>{product.created_at}</td>
              <td>{product.updated_at}</td>
              <td>
                <button className="edit-btn" onClick={() => openModal("Edit", product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && modalType === "Add" && <AddProduct onClose={closeModal} onSave={handleSave} />}
      {isModalOpen && modalType === "Edit" && <EditProduct product={currentProduct} onClose={closeModal} onSave={handleSave} />}
    </div>
  );
}
