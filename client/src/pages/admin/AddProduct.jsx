import React, { useState } from "react";
import "../../css/AddProduct.css";

export default function AddProduct({ onClose, onSave }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: "",
    gender: "",
    size: "",
    color: "",
    stock: "",
    image_urls: [""], // Changed to match backend field name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...product.image_urls];
    newImageUrls[index] = value;
    setProduct({ ...product, image_urls: newImageUrls });
  };

  const addImageUrlField = () => {
    setProduct({ ...product, image_urls: [...product.image_urls, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category) {
      alert("Name, Price, and Category are required!");
      return;
    }

    const filteredImageUrls = product.image_urls.filter((url) => url.trim() !== "");

    if (filteredImageUrls.length === 0) {
      alert("At least one valid image URL is required.");
      return;
    }

    // Convert size string into an array (split by comma)
    const sizeArray = product.size ? product.size.split(",").map((s) => s.trim()) : [];

    const productWithValidData = {
      ...product,
      image_urls: filteredImageUrls,
      size: sizeArray // Ensure size is an array 
    };
    onSave(productWithValidData);
    onClose();
  };


  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <form onSubmit={handleSubmit}>
              <h3>Add New Product</h3>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Gender:
                <select name="gender" value={product.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Men">men</option>
                  <option value="Women">women</option>
                  <option value="Women">unisex</option>
                </select>
              </label>
              <label>
                Size:
                <input
                  type="text"
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                />
              </label>
              <label>
                Color:
                <input
                  type="text"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                />
              </label>
              <label>
                Image URLs:
                {product.image_urls.map((url, index) => (
                  <input
                    key={`image-url-${index}`} // Unique key for each input field
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  />
                ))}
                <button type="button" onClick={addImageUrlField}>
                  Add Another Image
                </button>
              </label>
              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
