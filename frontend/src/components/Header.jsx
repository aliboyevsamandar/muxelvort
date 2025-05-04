import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <nav className="dark:bg-slate-900 bg-slate-800 fixed w-full z-50 py-3">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex items-center gap-4">
            <img src="/logoo.png" className="w-12" alt="Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-white">
              Muxel Vort
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white text-3xl focus:outline-none ml-auto"
          >
            &#9776;
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            <li>
              <Link to="/">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  All
                </p>
              </Link>
            </li>
            <li>
              <Link to="/foods">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  Foods
                </p>
              </Link>
            </li>
            <li>
              <Link to="/drinks">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  Drinks
                </p>
              </Link>
            </li>
            <li>
              <Link to="sweets">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  Sweets
                </p>
              </Link>
            </li>
            <li>
              <Link to="/fruits">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  Fruits
                </p>
              </Link>
            </li>
            <li>
              <Link to="connection">
                <p className="text-lg font-semibold py-2 px-3 dark:text-white text-white hover:text-blue-400 transition">
                  Connection
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/admin">
          <button className="lg:flex hidden px-5 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition active:scale-95">
            Admin
          </button>
        </Link>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-gray-800 text-white z-10 p-6 rounded-b-lg">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link to="/" onClick={toggleMenu}>
                <p className="text-lg">All</p>
              </Link>
            </li>
            <li>
              <Link to="/foods" onClick={toggleMenu}>
                <p className="text-lg">Foods</p>
              </Link>
            </li>
            <li>
              <Link to="/drinks" onClick={toggleMenu}>
                <p className="text-lg">Drinks</p>
              </Link>
            </li>
            <li>
              <Link to="/sweets" onClick={toggleMenu}>
                <p className="text-lg">Sweets</p>
              </Link>
            </li>
            <li>
              <Link to="/fruits" onClick={toggleMenu}>
                <p className="text-lg">Fruits</p>
              </Link>
            </li>
            <li>
              <Link to="connection" onClick={toggleMenu}>
                <p className="text-lg">Connection</p>
              </Link>
            </li>
          </ul>
          <Link to="/admin" onClick={toggleMenu}>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-lg py-2 rounded-md">
              Admin
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
