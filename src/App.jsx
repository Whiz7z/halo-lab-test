import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
