import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import App from "./App";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import User from "./components/User";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/profile/:username",
        element: <User />,
      },
      {
        path: "/home/chatbot",
        element: <Chatbot />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
