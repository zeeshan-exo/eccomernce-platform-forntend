import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Products from "./pages/products.jsx";
import Orders from "./pages/order.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Logout from "./pages/logout.jsx";
import Users from "./pages/Users.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./auth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import UserForm from "./pages/UserForm.jsx";
import Category from "./pages/Category.jsx";
import Subcategory from "./pages/SubCategory.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<Products />} />
              <Route path="customer" element={<Users />} />
              <Route path="order" element={<Orders />} />
              <Route path="category" element={<Category />} />
              <Route path="subcategory" element={<Subcategory />} />

              <Route
                path="customer/update/:id"
                element={<UserForm isUpdate={true} />}
              />
              <Route path="customer/create" element={<UserForm />} />

              <Route
                path="product/update/:id"
                element={<ProductForm isUpdate={true} />}
              />
              <Route path="product/create" element={<ProductForm />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
