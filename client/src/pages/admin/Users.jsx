import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../../utils/api'; // Make sure to add the addUser function

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: 'customer',
    phone: '',
    address: ''
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUsers(token);
      setUsers(userData);
      setLoading(false);
    };
    fetchUserData();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = await deleteUser(id, token);  // Pass id to deleteUser
      if (!success) {
        console.error('Failed to delete user');
        return;
      }
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };
  const handleEditUserClick = (user) => {
    setEditingUser(user); // Set the user being edited
    setFormData({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      phone: user.phone || '',
      address: user.address || ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (editingUser) {
      // Update existing user
      const updatedUser = await updateUser(editingUser.id, formData, token);  // Pass the correct user ID and form data
      if (!updatedUser) {
        console.error('Failed to update user');
        return;
      }
      setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? updatedUser : user)));
      alert("Users updated succesfully !!")
    } 
    
    setShowModal(false);
  };
  

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="view-users">
      <h2>Manage Users</h2>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEditUserClick(user)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingUser ? 'Update User' : 'Add User'}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    {editingUser ? 'Update' : 'Add'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
