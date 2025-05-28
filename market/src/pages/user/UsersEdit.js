import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const UsersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false); // ⬅️ Untuk toggle password visibility

  const getUsers = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/users/${id}`)
      .then(response => {
        const { name, email } = response.data;
        setUsersData({ name, email, password: "" }); // password dikosongkan
      })
      .catch(error => {
        alert('Error fetching user details: ' + error);
      });
  }, [id]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsersData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://127.0.0.1:8000/api/users/${id}`, usersData)
      .then(response => {
        alert('User updated successfully');
        navigate('/users'); // Pastikan ini sesuai route daftar
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800 mb-2">Edit User</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={usersData.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={usersData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={usersData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter new password"
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersEdit;
