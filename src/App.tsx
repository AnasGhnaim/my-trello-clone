import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { Provider } from "react-redux";
// import store from "./store/store";

const queryClient = new QueryClient();
function App() {
  return(
    // <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <h1 className="text-red-500 text-4xl">Test</h1>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </Provider>
  );
}
export default App;
