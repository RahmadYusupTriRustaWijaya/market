import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersIndex = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        alert('Error fetching data: ' + error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
        .then(() => {
          alert('Data deleted successfully');
          loadUsers();
        })
        .catch(error => {
          alert('Error deleting the data: ' + error);
        });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800 mb-2">User Data</h1>
      <Link to="/user/create" className="btn btn-primary mb-2">Create</Link>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/user/edit/${user.id}`} className="btn btn-sm btn-info">Edit</Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-sm btn-danger ml-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersIndex;
