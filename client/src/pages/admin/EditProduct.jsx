import React, { useState } from "react";

export default function EditProduct({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedProduct.title || !editedProduct.price) {
      alert("Title and Price are required!");
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
          Title:
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
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
          Image URL:
          <input
            type="text"
            name="image"
            value={editedProduct.image}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
