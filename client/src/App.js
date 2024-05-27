import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Redirect
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/products";
import Checkout from "./components/Checkout";
import MyOrders from "./components/MyOrders";
import History from "./components/History";
import MyCart from "./components/MyCart";
import Users from "./admin_components/Users";
import Orders from "./admin_components/Orders";
import AddCategory from "./admin_components/AddCategory";
import AddProduct from "./admin_components/AddProduct";
import AdminProducts from "./admin_components/Products";
import AdminProductItem from "./admin_components/ProductItem";
import UpdateProduct from "./admin_components/Update";
import AdminProtectedRoute from "./admin_components/AdminProtectedRoute";
import Dashboard from "./admin_components/Dashoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/shopping"
          element={<ProtectedRoute Component={Products} />}
        />
        <Route
          exact
          path="/order-details/:id"
          element={<ProtectedRoute Component={Checkout} />}
        />
        <Route
          exact
          path="/my-orders"
          element={<ProtectedRoute Component={MyOrders} />}
        />
        <Route
          exact
          path="/my-history"
          element={<ProtectedRoute Component={History} />}
        />
        <Route
          exact
          path="/my-cart"
          element={<ProtectedRoute Component={MyCart} />}
        />

        {/* Admin routes */}
        <Route
          exact
          path="/admin/dashboard"
          element={<AdminProtectedRoute Component={Dashboard} />}
        />
        <Route
          exact
          path="/admin/users"
          element={<AdminProtectedRoute Component={Users} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={<AdminProtectedRoute Component={Orders} />}
        />
        <Route
          exact
          path="/admin/add-category"
          element={<AdminProtectedRoute Component={AddCategory} />}
        />
        <Route
          exact
          path="/admin/all-products"
          element={<AdminProtectedRoute Component={AdminProducts} />}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={<AdminProtectedRoute Component={AdminProductItem} />}
        />
        <Route
          exact
          path="/admin/add-product"
          element={<AdminProtectedRoute Component={AddProduct} />}
        />
        <Route
          path="/admin/product-update/:id"
          element={<AdminProtectedRoute Component={UpdateProduct} />}
        />

        <Route exact path="/not-found" element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to="/not-found" element={<NotFound />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
