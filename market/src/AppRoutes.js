import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Users from './pages/user/Users'; 
import Brands from './pages/Brand/Brands';
import Categories from "./pages/Category/Categories";
import Products from './pages/Product/Products';
import Orders from "./pages/Order/Orders";
import UsersIndex from "./pages/user/UsersIndex";
import UsersCreate from "./pages/user/UsersCreate";
import UsersEdit from "./pages/user/UsersEdit";
//import Brands from "./pages/Brand/BrandsIndex";
import ProductsIndex from "./pages/Product/ProductsIndex";
import ProductsCreate from "./pages/Product/ProductsCreate";


const routesConfig = [
    { path: "/", component: Dashboard },
    { path: "/Users", component: Users },
    { path: "/Brands", component: Brands },
    { path: "/categories", component: Categories },
    { path: "/products", component: Products },
    { path: "/orders", component: Orders },
    { path: "/user", component: UsersIndex}, 
    { path: "/user/create", component: UsersCreate }, 
    { path: "/user/edit/:id", component: UsersEdit },
   // { path: "/brands", component: BrandsIndex },
   { path: "/product", component: ProductsIndex },
   { path: "/product/create", component: ProductsCreate },
];

function AppRoutes() {
    return (
        <Routes>
            {routesConfig.map((route, index) => {
                const Component = route.component;
                return <Route key={index} path={route.path} element={<Component />} />;
            })}
        </Routes>
    );
}

export default AppRoutes;
