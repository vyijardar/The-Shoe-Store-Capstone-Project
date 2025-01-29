import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUsers(token);
      setUsers(userData);
      setLoading(false);
    };

    fetchUserData();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="view-users">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
