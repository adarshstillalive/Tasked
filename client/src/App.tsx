import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import CommonLayout from "./layout/CommonLayout";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}

export default App;
