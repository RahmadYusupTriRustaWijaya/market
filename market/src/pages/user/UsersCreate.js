import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersCreate = () => {
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsersData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/users', usersData)
      .then(response => {
        alert('User added successfully:', response.data);
        navigate('/user');
      })
      .catch(error => {
        alert('Error adding user:', error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800 mb-2">Add New User</h1>
      <Link to="/user" className="btn btn-secondary mb-2">Back</Link>

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
              <input
                type="text"
                name="password"
                value={usersData.password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersCreate;
