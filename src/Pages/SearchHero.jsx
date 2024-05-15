import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../redux/reducers/navbarReducers";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  setFilterRole,
  setHeroName,
  setSearchQuery,
} from "../redux/reducers/dataReducers";
import { searchDataHero } from "../redux/actions/dataActions";
import { logout } from "../redux/actions/authActions";
import dayjs from "dayjs";
import {
  setShowDropdown,
  setShowLogoutModal,
  setProfileModalOpen,
} from "../redux/reducers/modalReducers";

export default function SearchHero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { filterRole, heroName, searchHero, searchQuery } = useSelector(
    (state) => state.hero
  );
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
    dispatch(searchDataHero(heroName, filterRole));
  }, [heroName, filterRole]);

  const handleChange = (event) => {
    setInput(event.target.value);
    //dispatch(setHeroName(event.target.value));
  };

  const handleRoleChange = (event) => {
    dispatch(setFilterRole(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi minimal panjang input heroName sebelum melakukan pencarian
    if (input.trim().length < 1) {
      toast.info(
        "Masukkan nama Hero dengan minimal 1 karakter untuk melakukan pencarian!"
      );
      return;
    }

    // Validasi jika user memilih role
    if (!filterRole) {
      toast.info("Pilih Role untuk melakukan pencarian!");
      return;
    }

    const formattedHeroName = input.trim().toLowerCase();
    console.log("formattedHeroName", formattedHeroName);

    // Filter heroes berdasarkan role yang dipilih
    const filteredHeroes = searchHero.filter(
      (e) =>
        e.hero_role.toLowerCase() === filterRole.toLowerCase() &&
        e.hero_name.toLowerCase().includes(formattedHeroName)
    );
    console.log("filteredHeroes", filteredHeroes);
    // Validasi apakah ada hero yang sesuai dengan pencarian
    if (filteredHeroes.length === 0) {
      toast.error(
        `Hero dengan nama '${formattedHeroName}' tidak ditemukan dalam Role ${filterRole}`
      );
      return;
    }

    // Jika pencarian berhasil, set nilai searchQuery
    dispatch(setSearchQuery(formattedHeroName));

    // Reset heroName dan filterRole setelah pencarian
    dispatch(setHeroName("")); // Kosongkan input heroName
    dispatch(setFilterRole("")); // Kosongkan pilihan Role
    dispatch(setHeroName(input));
  };

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };
  const handleLogout = () => {
    dispatch(logout(navigate));
    dispatch(setShowLogoutModal()); // Close modal after logout
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

      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Pencarian Hero Mobile Legends
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Cari Hero"
            value={input}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <select
            value={filterRole}
            onChange={handleRoleChange}
            className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Pilih Role</option>
            <option value="Fighter">Fighter</option>
            <option value="Tank">Tank</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
            <option value="Support">Support</option>
            <option value="Mage">Mage</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Cari
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {searchHero
            .filter((e) =>
              e?.hero_name?.toLowerCase().includes(searchQuery?.toLowerCase())
            )
            .map((datahero) => (
              <div
                key={datahero.hero_id}
                onClick={() => {
                  navigate("detail", {
                    state: { hero_id: datahero.hero_id },
                  });
                }}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 border"
              >
                <h2 className="text-xl font-bold mb-2 underline">
                  {datahero.hero_name}
                </h2>
                <h2 className="text-md mb-2">Role: {datahero.hero_role}</h2>
                <h2 className="text-md mb-2">
                  Specialist: {datahero.hero_specially}
                </h2>
                <img
                  src={
                    listAvatar?.find((gambar) =>
                      gambar
                        ?.toLowerCase()
                        .includes(datahero?.hero_name?.toLowerCase())
                    ) || "/default-avatar.jpg"
                  }
                  alt={datahero.hero_name}
                  className="w-40 h-auto mt-4 rounded-lg"
                />
                <button
                  type="button"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mt-5 mb-2"
                >
                  Detail
                </button>
              </div>
            ))}
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
