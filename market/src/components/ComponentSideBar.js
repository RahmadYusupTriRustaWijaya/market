import React from 'react';
import { NavLink } from 'react-router-dom';

function ComponentSideBar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/#">
        <div className="sidebar-brand-text mx-3">MAMAT GUNSHOP Admin Panel</div>
      </a>

      <li className="nav-item">
        <NavLink to="/#" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#masterSection"
          aria-expanded="true"
          aria-controls="masterSection"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Master</span>
        </a>

        <div id="masterSection" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink to="/user" className="collapse-item">Users</NavLink>
            <NavLink to="/brands" className="collapse-item">Brands</NavLink>
            <NavLink to="/categories" className="collapse-item">Categories</NavLink>
            <NavLink to="/product" className="collapse-item">Products</NavLink>
            <NavLink to="/orders" className="collapse-item">Orders</NavLink>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ComponentSideBar;
