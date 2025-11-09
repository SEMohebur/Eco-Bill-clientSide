import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { FaUserCheck } from "react-icons/fa";
import logo from "../assets/EcoBill.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userInfo, logOut, setUserInfo } = use(AuthContext);

  const handleLogOut = () => {
    logOut().then(() => {
      setUserInfo(null);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log Out",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  // console.log(userInfo);

  return (
    <nav className=" p-4 border-b border-gray-200">
      <div className=" flex flex-col justify-center items-center md:flex-row md:justify-between">
        {/* left logo  */}
        <div>
          <Link to="/" className=" ">
            <img
              className=" h-12 w-12 rounded-full mb-5 md:mb-0"
              src={logo}
              alt=""
            />
          </Link>
        </div>
        {/* right links  */}
        <ul className=" flex flex-col md:flex-row items-center gap-5">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bills">Bills</NavLink>
          </li>

          <li>
            {" "}
            {userInfo?.email ? (
              <ul className=" flex flex-col md:flex-row  gap-5 items-center">
                <li>
                  <NavLink to="/myPayBils">My Pay Bills</NavLink>
                </li>
                <li>
                  <img
                    className="w-10 h-10  rounded-full object-cover border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300"
                    src={userInfo ? userInfo?.photoURL : <FaUserCheck />}
                    alt="User Profile"
                  />
                </li>
                <button
                  className=" btn bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </ul>
            ) : (
              <ul className=" flex flex-col md:flex-row items-center gap-5">
                <li>
                  <NavLink
                    to="/login"
                    className="btn bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="btn bg-green-600 hover:bg-green-700 text-white"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
