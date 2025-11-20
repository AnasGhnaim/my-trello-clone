import { type JSX } from "react";
import Navbar from "../Components/Navbar";
import List from "../Components/List/List";

function ListPage(): JSX.Element {
  return (
    <>
      <Navbar />
      <List />
    </>
  );
}

export default ListPage;
