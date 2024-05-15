import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { ToastContainer } from "react-toastify";
import {
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaPhoneAlt,
  FaInstagram,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import {
  setShowDropdown,
  setShowLogoutModal,
} from "../redux/reducers/modalReducers";

export default function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { showLogoutModal, showDropdown } = useSelector((state) => state.modal);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    dispatch(setShowLogoutModal());
    dispatch(setShowDropdown(false));
  };

  const handleDropdownToggle = () => {
    dispatch(setShowDropdown());
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <span className="text-white text-xl font-bold ml-2">
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
            {isLoggedIn && (
              <li className="relative">
                <button
                  className="text-white px-2 py-1 hover:text-blue-300 hover:scale-105 flex items-center"
                  onClick={handleDropdownToggle}
                >
                  <FaUser className="mr-2" />
                  {user?.email}
                  <FaChevronDown className="ml-2" />
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button
                      className="flex px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left items-center"
                      onClick={() => dispatch(setShowLogoutModal())}
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1 - Phone Number */}
          <a
            href="tel:085798160976"
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 border block"
          >
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="h-6 w-6 mr-2 text-gray-600" />
              <p className="text-lg font-medium text-gray-800">Phone Number</p>
            </div>
            <p className="text-gray-600">085798160976</p>
          </a>

          {/* Card 2 - Instagram */}
          <a
            href="https://www.instagram.com/rahmatarayyan05/"
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 border block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center mb-4">
              <FaInstagram className="h-6 w-6 mr-2 text-gray-600" />
              <p className="text-lg font-medium text-gray-800">Instagram</p>
            </div>
            <p className="text-blue-500 hover:underline">@rahmatarayyan05</p>
          </a>

          {/* Card 3 - Github */}
          <a
            href="https://github.com/rayyan503"
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 border block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center mb-4">
              <FaGithub className="h-6 w-6 mr-2 text-gray-600" />
              <p className="text-lg font-medium text-gray-800">Github</p>
            </div>
            <p className="text-blue-500 hover:underline">@rayyan503</p>
          </a>

          {/* Card 4 - Email */}
          <a
            href="mailto:rahmatarayan26@gmail.com"
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 border block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center mb-4">
              <FaEnvelope className="h-6 w-6 mr-2 text-gray-600" />
              <p className="text-lg font-medium text-gray-800">Email</p>
            </div>
            <p className="text-blue-500 hover:underline">
              rahmatarayan26@gmail.com
            </p>
          </a>
        </div>
      </div>

      {/* Modal Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg mb-4">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600"
                onClick={() => dispatch(setShowLogoutModal())}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
