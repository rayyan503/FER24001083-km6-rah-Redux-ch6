import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listAvatar } from "../assets/avatar";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { getMe, logout } from "../redux/actions/authActions";
import { FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import {
  setShowDropdown,
  setShowLogoutModal,
} from "../redux/reducers/modalReducers";

function HomeUser() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { showLogoutModal, showDropdown } = useSelector((state) => state.modal);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  useEffect(() => {
    dispatch(getMe(null, null, null));
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, [dispatch, location, navigate]);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Jika belum login, alihkan ke halaman login

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % listAvatar.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch(logout(navigate));
    dispatch(setShowLogoutModal()); // tutup modal setelah logout
    dispatch(setShowDropdown(false));
  };

  const handleDropdownToggle = () => {
    dispatch(setShowDropdown());
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

      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          {isLoggedIn && (
            <h2 className="text-4xl font-bold">
              Selamat Datang {user?.name} di Mobile Legends
            </h2>
          )}
          <p className="text-lg">
            Bersiaplah untuk petualangan epik di medan pertempuran yang
            menegangkan, cari hero favorit Anda sesuai peran.
          </p>
          <Link
            to={"/search"}
            className="inline-block px-4 py-2 mt-10 bg-blue-400 text-white rounded-md hover:scale-105 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Cari Hero
          </Link>
        </div>
      </div>

      <div className="container flex flex-col md:flex-row px-6 mx-auto">
        <div className="flex flex-1 flex-col justify-center p-5 bg-white">
          <h1 className="md:mb-5 text-3xl font-bold">
            Data Semua Hero Mobile Legends
          </h1>
          <p className="md:mb-0">
            Mobile Legends memiliki banyak karakter yang bisa kita mainkan. Hero
            permainan dibagi menjadi banyak peran seperti Assassin, Tank,
            Marksman, Fighter, Mage, dan Support. Untuk mendapatkan salah satu
            hero di Mobile Legends, kita bisa menggunakan BP hingga 32000 atau
            battle point atau menggunakan tiket jika ada.
          </p>
          <Link
            to={"/datahero"}
            className="bg-green-500 text-cyan-50 p-3 md:p-3 py-2 w-fit mt-2 md:mt-5 hover:scale-105 hover:bg-red-400 rounded-md inline-block"
          >
            Lihat Hero
          </Link>
        </div>
        <div className="flex flex-1 mt-10 justify-center relative mx-auto rounded-sm">
          <img
            src={listAvatar[currentAvatarIndex]}
            className="w-80 h-72 rounded-md"
            alt="Banner Mobile Legends"
          />
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

      <footer className="bg-gray-800 text-white text-center py-4 mt-32">
        <p>&copy; 2024 Mobile Legends</p>
      </footer>
    </>
  );
}

export default HomeUser;
