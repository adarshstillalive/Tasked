import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import CommonLayout from "./layout/CommonLayout";

function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        {
          path: "auth",
          element: <Auth />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={appRoute} />
    </>
  );
}

export default App;
