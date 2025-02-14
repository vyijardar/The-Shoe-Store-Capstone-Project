import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";
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
        const response = await fetch(`${api}/api/products`, {
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
   
      if (!token) {
        console.error("Admin token is missing!");
        return;
      }

    
      let response, newProduct;

      if (modalType === "Add") {
        response = await fetch(`
          ${api}/api/products/addproduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(product),
        });

      } else if (modalType === "Edit") {
        response = await fetch(`
          ${api}/api/products/${currentProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(product),
        });

      }
      const rawData = await response.text();
     
      try {
        newProduct = JSON.parse(rawData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
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
      await fetch(`${api}/api/products/${productId}`, {
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
      <div className=" mt-3 border p-3" style={{ overflowX: "auto" }}>
      <div className="table-responsive">
        <div className="d-table w-100 border" style={{ minWidth: "1800px" }}>
          {/* Table Header */}
          <div className="d-table-row bg-primary text-white text-center fw-bold">
            {[
              "ID",
              "Name",
              "Description",
              "Price",
              "Brand",
              "Category",
              "Gender",
              "Size",
              "Color",
              "Stock",
              "Image URL",
              "Created at",
              "Updated at",
              "Actions"
            ].map((header, index) => (
              <div key={index} className="d-table-cell p-2 border text-wrap" style={{ minWidth: "120px" }}>{header}</div>
            ))}
          </div>
          {/* Table Body */}
          {products.map((product) => (
            <div className="d-table-row border text-center align-items-center" key={product.id}>
              <div className="d-table-cell p-2 border text-wrap">{product.id}</div>
              <div className="d-table-cell p-2 border text-wrap">{product.name}</div>
              <div className="d-table-cell p-2 border text-wrap" style={{ maxWidth: "200px", overflowY: "auto", textOverflow: "ellipsis" }}>{product.description}</div>
              <div className="d-table-cell p-2 border">${product.price}</div>
              <div className="d-table-cell p-2 border">{product.brand}</div>
              <div className="d-table-cell p-2 border">{product.category}</div>
              <div className="d-table-cell p-2 border">{product.gender}</div>
              <div className="d-table-cell p-2 border text-wrap">{product.size?.join(", ") || "N/A"}</div>
              <div className="d-table-cell p-2 border">{product.color}</div>
              <div className="d-table-cell p-2 border">{product.stock}</div>
              <div className="d-table-cell p-2 border text-wrap" style={{ maxWidth: "200px", overflowY: "auto", textOverflow: "ellipsis" ,maxHeight:"200px"}}>{product.image_urls?.join(", ") || "N/A"}</div>
              <div className="d-table-cell p-2 border">{new Date(product.created_at).toLocaleString()}</div>
              <div className="d-table-cell p-2 border">{new Date(product.updated_at).toLocaleString()}</div>
              <div className="d-table-cell p-2 border d-flex justify-content-center gap-2">
                <button className="btn btn-warning btn-sm" onClick={() => openModal("Edit", product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {isModalOpen && modalType === "Add" && <AddProduct onClose={closeModal} onSave={handleSave} />}
      {isModalOpen && modalType === "Edit" && <EditProduct product={currentProduct} onClose={closeModal} onSave={handleSave} />}
    </div>
  );
}
