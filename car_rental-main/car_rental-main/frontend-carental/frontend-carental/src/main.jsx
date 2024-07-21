import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import View from "./components/View.jsx";
import Login from "./components/Login.jsx";
import Discount from "./components/Discount.jsx";
import Home from "./components/Home.jsx";
import Offer from "./components/Offer.jsx";
import About from "./components/About.jsx";
import Admin from "./components/Admin.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/",
        element: <View />,
      },

      {
        path: "/Offers",
        element: <Offer />,
      },
      {
        path: "/Discount",
        element: <Discount />,
      },
    ],
  },

  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
