import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import SigninPage from "./Pages/SigninPage";
import HomePage from "./Pages/HomePage";

import Layout from "./Components/Layout";
import BoardPage from "./Pages/Board";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./Components/ProtectedRoute";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <Routes>
              <Route path="/" element={<SigninPage />} />

              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/home" element={<HomePage />} />
                <Route path="/board" element={<BoardPage />} />
              </Route>
            </Routes>
          </CookiesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
export default App;
