import type { JSX } from "react";
import { signInWithGoogle, signInWithGithub } from "../auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../store/AuthSlice";
import { useCookies } from "react-cookie";

function SigninPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const handleGoogleLogin = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      const safeUser = {
        uid: user.uid,
        displayName: user.displayName,
        token,
      };
      dispatch(login(safeUser));
      setCookie("token", token, { path: "/", maxAge: 60 * 60 * 2 });
      navigate("/home");
    } catch (err) {
      console.error("Login or fetch error:", err);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { user, token } = await signInWithGithub();
      const safeUser = {
        uid: user.uid,
        displayName: user.displayName,
        token,
      };
      dispatch(login(safeUser));
      setCookie("token", token, { path: "/", maxAge: 60 * 60 * 2 });
      navigate("/home");
    } catch (err) {
      console.error("Login or fetch error:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-800">
      <div className="flex flex-col px-16 py-10 border rounded-lg bg-white shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="assets/logo.png" alt="logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-2xl text-blue-400 mt-2 text-center">
          Welcome to our App
        </h1>

        <div className="flex flex-col text-xl mt-6 w-full">
          <p className="mb-4 text-center font-semibold">Sign in with:</p>

          <div className="flex flex-row gap-4 justify-center">
            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="px-6 py-3 bg-red-500 text-white hover:bg-red-600 rounded-lg shadow-md transition"
            >
              Google
            </button>

            {/* GitHub Button */}
            <button
              onClick={handleGithubLogin}
              className="px-6 py-3 bg-gray-800 text-white hover:bg-black rounded-lg shadow-md transition"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
