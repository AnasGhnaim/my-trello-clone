import type { JSX } from "react";
import { Link } from "react-router";

function Navbar(): JSX.Element {
  return (
    <nav className="bg-gray-700 sticky top-0 z-50 shadow-sm border-b border-white  h-15 flex items-center justify-between mx-auto px-6 py-3 mt-b">
      <div className="flex">
        <Link to="/home" className="flex items-center gap-3  ">
          <img
            src="assets/logo.png"
            alt="Logo"
            className="h-10 w-auto shadow-md "
          />
        </Link>
      </div>
      <div className="flex space-x-6 text-lg font-medium">
        <h3 className="text-xl flex text-end text-white font-bold">
          Full Name
        </h3>
      </div>
    </nav>
  );
}

export default Navbar;
