import React, { useEffect } from "react";
import { logout } from "../redux/actions/authActions";

import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function About() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      // Jika belum login, alihkan ke halaman login
    }
  }, [isLoggedIn, navigate]);

  const handleToggleNavbar = () => {
    useDispatch(toggleNavbar());
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
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
              <img className="w-6 " src="/menu.png" alt="Menu" />
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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Mobile Legends
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Mobile Legends adalah arena pertarungan online multipemain (MOBA) yang
          populer game yang dikembangkan dan diterbitkan oleh Moonton.
          Bergabunglah dengan jutaan pemain di seluruh dunia dalam permainan
          yang intens dan kompetitif ini di mana Anda dapat memilih pahlawan
          yang berbeda, susun strategi dengan tim Anda, dan bertarung melawan
          lawan untuk meraih kemenangan.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Jelajahi berbagai mode permainan, kuasai pahlawan dengan kemampuan
          unik, dan naik rank jadi legenda di Mobile Legends!
        </p>
      </div>
    </>
  );
}
