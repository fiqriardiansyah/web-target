import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./context";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
                <AppRoutes />
            </GlobalProvider>
        </QueryClientProvider>
    )
}

export default App;