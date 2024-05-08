import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllDataHero } from "../redux/actions/dataActions";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

export default function DataHero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const data = useSelector((state) => state.hero);
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("data", data);

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
  };
  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-20 mt-10">
        {data?.hero?.hero &&
          data.hero.hero.map((e) => (
            <div key={e?.hero_id} className="bg-white rounded-lg p-4 shadow-md">
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
    </div>
  );
}
