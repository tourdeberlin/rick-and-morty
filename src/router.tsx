import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFoundPage from './pages/NotFound/NotFound';
import ResultsPage from './pages/ResultsPage';

const router = createBrowserRouter([
  { path: '/', element: <ResultsPage /> },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
