import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import SigninPage from "./Pages/SigninPage";
import HomePage from "./Pages/HomePage";
import ListPage from "./Pages/ListPage";
// import { Provider } from "react-redux";
// import store from "./store/store";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      {/* // <Provider store={store}> */}
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* // </Provider> */}
    </>
  );
}
export default App;
