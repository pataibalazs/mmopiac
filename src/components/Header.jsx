import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-12 px-6 py-4 lg:px-0"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NincsÜgynök</span>
            <img
              className="h-14 mb-2 w-auto hover:scale-110 ease-in-out duration-75"
              src="/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
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
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link
            to="/login"
            className="rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:border-slate-500 hover:text-slate-500 ease-in-out duration-50"
          >
            Bejelentkezek
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-slate-500 ease-in-out duration-50"
          >
            Regisztrálok
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
