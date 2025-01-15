import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { UserAuth } from "./pages/UserAuth";
import { ToastContainer } from "react-toastify";
import { LeadAuth } from "./pages/LeadAuth";
import UserLayout from "./layout/UserLayout";
import Home from "./pages/Home";
import LeadLayout from "./layout/LeadLayout";
import LeadHome from "./pages/LeadHome";
import AuthLayout from "./layout/AuthLayout";

function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <UserLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
        {
          path: "lead",
          element: <LeadLayout />,
          children: [
            {
              path: "",
              element: <LeadHome />,
            },
          ],
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "user",
              element: <UserAuth />,
            },
            {
              path: "lead",
              element: <LeadAuth />,
            },
          ],
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
