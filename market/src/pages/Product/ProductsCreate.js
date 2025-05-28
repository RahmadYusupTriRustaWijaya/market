import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsCreate = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    category_id: "",
    brand_id: "",
    name: "",
    slug: "",
    images: null,
    description: "",
    price: "",
    is_active: false,
    is_featured: false,
    in_stock: false,
    on_sale: false,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/brands')
    .then(res => setBrands(res.data.data ?? res.data ?? []))
    .catch(err => console.error("Error fetching brands", err));

  axios.get('http://127.0.0.1:8000/api/categories')
    .then(res => setCategories(res.data.data ?? res.data ?? []))
    .catch(err => console.error("Error fetching categories", err));
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'name') {
      const slugValue = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      setProductData(prev => ({
        ...prev,
        name: value,
        slug: slugValue,
      }));
    } else if (type === 'checkbox') {
      setProductData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setProductData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });

    axios.post('http://127.0.0.1:8000/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        alert('Product created successfully');
        navigate('/products');
      })
      .catch((err) => {
        alert('Error creating product: ' + err);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800 mb-2">Add New Product</h1>
      <Link to="/products" className="btn btn-secondary mb-2">Back</Link>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="name" className="form-control mb-2" placeholder="Name" onChange={handleChange} required />

            <input name="slug" className="form-control mb-2" placeholder="Slug" value={productData.slug} readOnly />

            <input name="images" type="file" className="form-control mb-2" onChange={handleChange} />

            <textarea name="description" className="form-control mb-2" placeholder="Description" onChange={handleChange} />

            <input name="price" type="number" className="form-control mb-2" placeholder="Price" onChange={handleChange} required />

            <select name="category_id" className="form-control mb-2" onChange={handleChange} value={productData.category_id}>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <select name="brand_id" className="form-control mb-2" onChange={handleChange} value={productData.brand_id}>
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>

            <div className="form-check mb-2">
              <input type="checkbox" name="is_active" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">Active</label>
            </div>
            <div className="form-check mb-2">
              <input type="checkbox" name="is_featured" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">Featured</label>
            </div>
            <div className="form-check mb-2">
              <input type="checkbox" name="in_stock" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">In Stock</label>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" name="on_sale" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">On Sale</label>
            </div>

            <button className="btn btn-success" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsCreate;
