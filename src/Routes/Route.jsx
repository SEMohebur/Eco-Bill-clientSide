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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,

    children: [
      { index: true, element: <Home></Home> },
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
      },
      {
        path: "/billDetails/:id",
        element: (
          <PrivateRoute>
            <BillDetails></BillDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/bills/${params.id}`),
      },

      {
        path: "/myPayBils",
        element: (
          <PrivateRoute>
            <MyPayBils></MyPayBils>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFoundPage></NotFoundPage> },
]);
