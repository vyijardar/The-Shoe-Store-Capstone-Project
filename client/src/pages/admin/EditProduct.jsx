import React, { useState } from "react";

export default function EditProduct({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedProduct.name || !editedProduct.price) {
      alert("Name and Price are required!");
      return;
    }
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Edit Product</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={editedProduct.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={editedProduct.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="men">men</option>
            <option value="women">women</option>
            <option value="unisex">unisex</option>
          </select>
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={editedProduct.size}
            onChange={handleChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={editedProduct.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={editedProduct.stock}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URLs:
          {editedProduct.image_urls.map((url, index) => (
            <input
              key={`image-url-${index}`}
              type="text"
              value={url}
              onChange={(e) => {
                const newImageUrls = [...editedProduct.image_urls];
                newImageUrls[index] = e.target.value;
                setEditedProduct({ ...editedProduct, image_urls: newImageUrls });
              }}
            />
          ))}
          <button type="button" onClick={() => setEditedProduct({ ...editedProduct, image_urls: [...editedProduct.image_urls, ""] })}>
            Add Another Image
          </button>
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
