import { type JSX } from "react";
import Navbar from "../Components/Navbar";
import Boards from "../Components/Home/Boards";

function HomePage(): JSX.Element {
  return (
    <>
      <Navbar />
      <Boards />
    </>
  );
}

export default HomePage;
