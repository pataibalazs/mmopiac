import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Global">
        <div className="flex items-center flex-none">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              className="h-14 mb-2 w-auto hover:scale-110 ease-in-out duration-75"
              src="/pictures/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex gap-x-12">
            <Link
              to="/"
              className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
            >
              Vásárolj
            </Link>
            <Link
              to="/selltous"
              className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
            >
              Adj el nekünk
            </Link>
            <Link
              to="/reviews"
              className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
            >
              Értékelések
            </Link>
            <Link
              to="/contact"
              className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
            >
              Kontakt
            </Link>
            <Link
              to="/about"
              className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
            >
              Rólunk
            </Link>
          </div>
        </div>
        <div className="flex-none" style={{ width: '80px' }}></div> {/* Empty div to balance the flex */}
      </nav>
    </header>
  );
}

export default Header;
