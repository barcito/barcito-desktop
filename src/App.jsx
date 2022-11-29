import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from './routes/Router';
import ThemeCustomization from "./themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

function App() {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeCustomization>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeCustomization>
  );
}

export default App;
