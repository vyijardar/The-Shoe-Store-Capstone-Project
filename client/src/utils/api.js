// api.js

// Placeholder base URL (replace with the actual URL of your backend once ready)
const API_BASE_URL = import.meta.env.API_URL || "http://localhost:3001";


// Function to fetch all users
export const fetchUsers = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};


// Function to update user information
export const updateUser = async (id, userData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error.message);
    return null;
  }
};

// Function to delete a user
export const deleteUser = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return null;
  }
};

// Function to add a new product
export const addProduct = async (product, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      throw new Error("Response is not in JSON format");
    }
  } catch (error) {
    console.error("Error adding product:", error.message);
    return null;
  }
};

// Function to edit an existing product
export const editProduct = async (id, product, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(product),
    });


    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      throw new Error("Response is not in JSON format");
    }
  } catch (error) {
    console.error("Error updating product:", error.message);
    return null;
  }
};


export const fetchProductsBySearch = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
          throw new Error('Failed to fetch search results');
      }
      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
  }
};
