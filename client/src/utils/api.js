// api.js

// Placeholder base URL (replace with the actual URL of your backend once ready)
const API_BASE_URL = "http://localhost:5000"; // Update with the real backend URL when available

// Function to fetch all users
export const fetchUsers = async (token) => {
  try {
    // Placeholder logic: Replace this with an actual API call when ready
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
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

// Function to add a new user
export const addUser = async (user, token) => {
  try {
    // Placeholder logic: Replace this with an actual API call when ready
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error.message);
    return null;
  }
};

// Function to update user information
export const updateUser = async (id, userData, token) => {
  try {
    // Placeholder logic: Replace this with an actual API call when ready
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
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
    // Placeholder logic: Replace this with an actual API call when ready
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
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
