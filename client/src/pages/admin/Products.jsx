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
        const response = await fetch("https://fakestoreapi.com/products");
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
      if (modalType === "Add") {
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      } else if (modalType === "Edit") {
        const response = await fetch(
          `https://fakestoreapi.com/products/${currentProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          }
        );
        const updatedProduct = await response.json();
        setProducts(
          products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );
      }
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
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== productId));
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
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => openModal("Edit", product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && modalType === "Add" && (
        <AddProduct onClose={closeModal} onSave={handleSave} />
      )}
      {isModalOpen && modalType === "Edit" && (
        <EditProduct
          product={currentProduct}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
