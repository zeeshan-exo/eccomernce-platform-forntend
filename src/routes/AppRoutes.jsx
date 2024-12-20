import { lazy } from "react";
import PATHS from "./Paths.jsx";

// Public Pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Signup = lazy(() => import("../pages/signup"));
const Login = lazy(() => import("../pages/login"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Layouts
const HomeLayout = lazy(() => import("../Layout/HomeLayout.jsx"));
const AdminLayout = lazy(() => import("../Layout/AdminLayout"));

//Pages (Public)

const Categories = lazy(() => import("../pages/userPages/categories.jsx"));

// Protected Pages (Admin)
const ProtectedRoute = lazy(() => import("../ProtectedRoute"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Product = lazy(() => import("../pages/product.jsx"));
const Products = lazy(() => import("../pages/userPages/Items.jsx"));
const Orders = lazy(() => import("../pages/order"));
const Users = lazy(() => import("../pages/Users"));
const Category = lazy(() => import("../pages/Category"));
const Subcategory = lazy(() => import("../pages/SubCategory"));
const UserForm = lazy(() => import("../pages/UserForm"));
const ProductForm = lazy(() => import("../pages/ProductForm"));
const Logout = lazy(() => import("../pages/logout"));

const routes = [
  { path: PATHS.MAIN, element: <LandingPage /> },
  { path: PATHS.SIGNUP, element: <Signup /> },
  { path: PATHS.LOGIN, element: <Login /> },
  {
    path: PATHS.HOME,
    element: <HomeLayout />,
    children: [
      { path: "cart", element: <Cart /> },
      { path: "items", element: <Products /> },
      { path: "categories", element: <Categories /> },
    ],
  },

  {
    path: PATHS.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: PATHS.DASHBOARD, element: <Dashboard /> },
          { path: PATHS.PRODUCT, element: <Product /> },
          { path: PATHS.USER, element: <Users /> },
          { path: PATHS.ORDER, element: <Orders /> },
          { path: "category", element: <Category /> },
          { path: "subcategory", element: <Subcategory /> },
          { path: "customer/update/:id", element: <UserForm isUpdate /> },
          { path: "customer/create", element: <UserForm /> },
          { path: "product/update/:id", element: <ProductForm isUpdate /> },
          { path: "product/create", element: <ProductForm /> },
          { path: "logout", element: <Logout /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
