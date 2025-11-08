import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFoundPage from './pages/NotFound/NotFound';
import CharacterPage from './pages/CharacterPage';
import App from './pages/App';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: ':id',
//         element: <CharacterPage />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <NotFoundPage />,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/:id',
    element: <CharacterPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
