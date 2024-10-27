import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
            },
        },
    });
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </main>
    );
}
