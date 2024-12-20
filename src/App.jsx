import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import routes from "../src/routes/AppRoutes.jsx";

function App() {
  const renderRoutes = (routeList) =>
    routeList.map(({ path, element, children }) => (
      <Route key={path} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{renderRoutes(routes)}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
