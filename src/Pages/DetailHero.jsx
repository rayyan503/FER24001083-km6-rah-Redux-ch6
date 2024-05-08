import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { getDetailHero } from "../redux/actions/dataActions";
import { ToastContainer, Zoom } from "react-toastify";
import { logout } from "../redux/actions/authActions";

export default function DetailHero() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { detail } = useSelector((state) => state.hero);
  const isOpen = useSelector((state) => state.navbar.isOpen);

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
  };
  return (
    <>
      <ToastContainer transition={Zoom} />
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
    </>
  );
}
