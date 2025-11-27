import type { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../store/AuthSlice";
import { useCookies } from "react-cookie";

function Navbar(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(["token"]);

  const handleLogOut = () => {
    dispatch(logout());
    removeCookie("token", { path: "/" });
    navigate("/");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);

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
        {user.displayName ? (
          <h3 className="text-xl flex text-end text-white font-bold">
            {user?.displayName}
          </h3>
        ) : (
          <div></div>
        )}
        <button
          className="flex items-center  stroke-white"
          onClick={handleLogOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="30"
            fill="currentColor"
            className="bi bi-box-arrow-left"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
            <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
