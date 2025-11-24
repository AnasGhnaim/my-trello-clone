import type { JSX } from "react";
import { signInWithGoogle, signInWithGithub } from "../auth";
import api, { setAuthToken } from "../Api/axiosInstance";

function SigninPage(): JSX.Element {
  const fetchUserBoards = async (token: string) => {
    // Set token for Axios instance
    setAuthToken(token);

    // Call backend to get boards for testing
    const response = await api.get("/boards");
    return response.data;
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      console.log("Logged in user:", user);

      const boards = await fetchUserBoards(token);
      console.log("User boards:", boards);
    } catch (err) {
      console.error("Login or fetch error:", err);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { user, token } = await signInWithGithub();
      console.log("Logged in user:", user);

      const boards = await fetchUserBoards(token);
      console.log("User boards:", boards);
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
