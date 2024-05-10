import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { ToastContainer } from "react-toastify";

export default function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      // Redirect to login page if not logged in
    }
  }, [isLoggedIn, navigate]);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const handleLogout = () => {
    dispatch(logout());
    // Additional logout logic can be added here
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <span className="text-white text-xl font-bold ml-5">
              Mobile Legends
            </span>
            <button
              className="block md:hidden text-white"
              onClick={handleToggleNavbar}
            >
              <img className="w-6" src="/menu.png" alt="Menu" />
            </button>
          </div>
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:space-x-4 items-center mt-4 md:mt-0`}
          >
            <li>
              <Link
                to="/homeuser"
                className="text-white hover:text-gray-400 block px-2 py-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-gray-400 block px-2 py-1"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-gray-400 block px-2 py-1"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 md:mt-0 rounded hover:bg-yellow-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 - Phone Number */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-lg font-medium text-gray-800">Phone Number</p>
            </div>
            <p className="text-gray-600">085798160976</p>
          </div>

          {/* Card 2 - Instagram */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 00-2.498 19.601A9.969 9.969 0 0012 22a9.968 9.968 0 002.498-19.601A10 10 0 0012 2zm0 4.969a2.12 2.12 0 100 4.241 2.12 2.12 0 000-4.241z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-800">Instagram</p>
            </div>
            <a
              href="https://www.instagram.com/rahmatarayyan05/"
              className="text-blue-500 hover:underline"
            >
              @rahmatarayyan05
            </a>
          </div>

          {/* Card 3 - Github */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.586 4.586a2 2 0 012.828 0L16 8.243V10h-3a2 2 0 00-2 2v4.243l-1.586 1.586a2 2 0 01-2.828 0L4 14.243V10h3a2 2 0 002-2V4.586zM8 14.243V10h3v4.243"
                />
              </svg>
              <p className="text-lg font-medium text-gray-800">Github</p>
            </div>
            <a
              href="https://github.com/rayyan503"
              className="text-blue-500 hover:underline"
            >
              @rayyan503
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
