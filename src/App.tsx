import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Signin from "./pages/Signup";

// Define types for the ProtectedRoute component props
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Define ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") ?? "false");

  return user ? children : <Navigate to="/signin" />;
};

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <Products />,
        },
      ],
    },
    {
      path: "signin",
      element: <Signin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
