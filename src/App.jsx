import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Products from "./pages/products.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./auth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="" element={<ProtectedRoute />}>
            <Route path="/product" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
