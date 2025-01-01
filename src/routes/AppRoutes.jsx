import { lazy } from "react";
import PATHS from "./Paths.jsx";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const Signup = lazy(() => import("../pages/signup"));
const Login = lazy(() => import("../pages/login"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const NotFound = lazy(() => import("../pages/NotFound"));

const HomeLayout = lazy(() => import("../Layout/HomeLayout.jsx"));
const AdminLayout = lazy(() => import("../Layout/AdminLayout"));

const Products = lazy(() => import("../pages/userPages/ProductsList.jsx"));
const Categories = lazy(() => import("../pages/userPages/categories.jsx"));
const subCategories = lazy(
  () => import("../pages/userPages/subCategoriesList.jsx")
);
const ProductDetails = lazy(
  () => import("../pages/userPages/ProductDetails.jsx")
);

const ProtectedRoute = lazy(() => import("../ProtectedRoute"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Product = lazy(() => import("../pages/product.jsx"));

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
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "subcategories", element: <subCategories /> },
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
