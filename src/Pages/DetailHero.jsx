import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { getDetailHero } from "../redux/actions/dataActions";
import { ToastContainer, Zoom } from "react-toastify";
import { logout } from "../redux/actions/authActions";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import dayjs from "dayjs";
import {
  setShowDropdown,
  setShowLogoutModal,
  setProfileModalOpen,
} from "../redux/reducers/modalReducers";

export default function DetailHero() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { detail } = useSelector((state) => state.hero);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { showLogoutModal, showDropdown, profileModalOpen } = useSelector(
    (state) => state.modal
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      // Jika belum login, alihkan ke halaman login
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(getDetailHero(location.state.hero_id));
  }, [dispatch, location.state.hero_id]);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    dispatch(setShowLogoutModal()); // tutup modal setelah logout
    dispatch(setShowDropdown(false));
    dispatch(setProfileModalOpen(false));
  };

  const handleDropdownToggle = () => {
    dispatch(setShowDropdown());
  };

  const handleProfileModal = () => {
    dispatch(setProfileModalOpen(true));
  };

  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <>
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
                  <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center mr-2">
                    {getInitial(user?.email)}
                  </div>
                  {user?.email}
                  <FaChevronDown className="ml-2" />
                </button>
                {showDropdown && (
                  <div className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ml-2">
                    <button
                      className="flex px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left items-center "
                      onClick={handleProfileModal}
                    >
                      <FaUser className="mr-2" />
                      Profile
                    </button>
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

      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto border border-gray-300 p-8 rounded-lg shadow-lg">
          {detail && (
            <div key={detail?.hero_id}>
              <h1 className="text-3xl font-bold mb-4">{detail?.hero_name}</h1>
              <p className="text-lg mb-2">Role: {detail?.hero_role}</p>
              <p className="text-lg mb-2">
                Specialist: {detail?.hero_specially}
              </p>
              <ul className="text-lg mb-4">
                <li>
                  Hero Durability : {detail?.hero_overview.hero_durability}
                </li>
                <li>Hero Offence : {detail?.hero_overview.hero_offence}</li>
                <li>Hero Ability : {detail?.hero_overview.hero_ability}</li>
                <li>
                  Hero Difficulty : {detail?.hero_overview.hero_difficulty}
                </li>
              </ul>
              <img
                src={`${listAvatar?.find((gambar) =>
                  gambar
                    ?.toLowerCase()
                    .includes(detail?.hero_name?.toLowerCase())
                )}`}
                alt={detail?.hero_name}
                className="w-50 h-auto rounded-lg mx-auto"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Link
            to={"/search"}
            className="inline-block px-4 py-2 mt-10 bg-red-400 text-white rounded-md hover:bg-blue-300 transition duration-300 ease-in-out"
          >
            Kembali
          </Link>
        </div>
      </div>

      {/* Modal Profile */}
      {profileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md ">
            <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center mr-2 mx-24 mb-2">
              {getInitial(user?.email)}
            </div>
            <p className="text-lg mb-4">Informasi Profil Pengguna</p>
            <p>
              <strong>Nama:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {user?.createdAt
                ? dayjs(user.createdAt).format("DD/MM/YYYY")
                : "Tidak ada informasi"}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-5"
              onClick={() => dispatch(setProfileModalOpen(false))}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

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
