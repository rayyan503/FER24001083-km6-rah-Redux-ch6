import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllDataHero } from "../redux/actions/dataActions";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import {
  setShowDropdown,
  setShowLogoutModal,
} from "../redux/reducers/modalReducers";

export default function DataHero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const data = useSelector((state) => state.hero);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { showLogoutModal, showDropdown } = useSelector((state) => state.modal);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      // Jika belum login, alihkan ke halaman login
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    dispatch(getAllDataHero());
  }, []);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    dispatch(setShowLogoutModal()); // tutup modal setelah logout
    dispatch(setShowDropdown(false));
  };

  const handleDropdownToggle = () => {
    dispatch(setShowDropdown());
  };

  return (
    <div>
      <ToastContainer transition={Zoom} />
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
                  <div className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button
                      className="flex px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left items-center "
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-20 mt-10">
        {data?.hero?.hero &&
          data.hero.hero.map((e) => (
            <div
              key={e?.hero_id}
              className="bg-white rounded-lg p-4 shadow-md hover:scale-105 border"
            >
              <div className="font-3xl font-bold underline">{e?.hero_name}</div>
              <div className="font-md">Role: {e?.hero_role}</div>
              <div className="font-md">Specialist: {e?.hero_specially}</div>
              <img
                src={`${listAvatar?.find((gambar) =>
                  gambar?.toLowerCase().includes(e?.hero_name?.toLowerCase())
                )}`}
                alt={e?.hero_name}
                className="w-full h-auto rounded-lg mt-5"
              />
            </div>
          ))}
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
      <footer className="bg-gray-800 text-white text-center py-4 mt-32">
        <p>&copy; 2024 Mobile Legends</p>
      </footer>
    </div>
  );
}
