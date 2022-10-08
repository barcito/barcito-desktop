import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from './routes/Router';
import ThemeCustomization from "./themes";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeCustomization>
  );
}

export default App;
