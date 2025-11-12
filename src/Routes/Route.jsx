import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import About from "../Pages/About";
import NotFoundPage from "../Pages/NotFoundPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import MyPayBils from "../Pages/MyPayBils";
import Bills from "../Pages/Bills";
import ContactUs from "../Pages/ContactUs";
import BillDetails from "../Pages/BillDetails";
import Profile from "../Pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,

    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/latest-bills"),
        hydrateFallbackElement: (
          <div className=" flex justify-center items-center h-48">
            <span className="loading loading-ring loading-xl "></span>
          </div>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      { path: "/contact", element: <ContactUs></ContactUs> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/bills",
        element: <Bills></Bills>,
        loader: () => fetch("http://localhost:3000/bills"),
        hydrateFallbackElement: (
          <div className=" flex justify-center items-center h-48">
            <span className="loading loading-ring loading-xl "></span>
          </div>
        ),
      },
      {
        path: "/billDetails/:id",
        element: (
          <PrivateRoute>
            <BillDetails></BillDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/myPayBils",
        element: (
          <PrivateRoute>
            <MyPayBils></MyPayBils>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFoundPage></NotFoundPage> },
]);
