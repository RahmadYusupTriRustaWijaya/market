import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsIndex = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        alert('Error fetching products: ' + error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
        .then(() => {
          alert('Product deleted successfully');
          loadProducts();
        })
        .catch(error => {
          alert('Error deleting product: ' + error);
        });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800 mb-2">Product Data</h1>
      <Link to="/product/create" className="btn btn-primary mb-2">Create</Link>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>In Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand?.name || '-'}</td>
                    <td>{product.category?.name || '-'}</td>
                    <td>{product.price}</td>
                    <td>{product.in_stock ? 'Yes' : 'No'}</td>
                    <td>
                      <Link to={`/product/edit/${product.id}`} className="btn btn-sm btn-info">Edit</Link>
                      <button
                        onClick={() => handleDelete(product.id)}
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

export default ProductsIndex;
