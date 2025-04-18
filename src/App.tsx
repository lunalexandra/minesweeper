import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GamePage, LeaderboardPage, NotFound } from './pages';
import { Layout } from './components';
import './App.css'

export default function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage />} />
        <Route path="/leaders" element={<LeaderboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    ),
    { basename: '/minesweeper' }
  );

  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}
