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
import UserProtectedRoute from "./routes/protectedRoutes/UserProtectedRoute";
import LeadProtectedRoute from "./routes/protectedRoutes/LeadProtectedRoute";
import UserAuthProtectedRoute from "./routes/protectedRoutes/UserAuthProtectedRoute";
import LeadAuthProtectedRoute from "./routes/protectedRoutes/LeadAuthProtectedRoute";
import { WebSocketProvider } from "./context/webSocketContext";

function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
            <UserProtectedRoute>
              <WebSocketProvider>
                <UserLayout />
              </WebSocketProvider>
            </UserProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
        {
          path: "lead",
          element: (
            <LeadProtectedRoute>
              <WebSocketProvider>
                <LeadLayout />
              </WebSocketProvider>
            </LeadProtectedRoute>
          ),
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
              element: (
                <UserAuthProtectedRoute>
                  <UserAuth />
                </UserAuthProtectedRoute>
              ),
            },
            {
              path: "lead",
              element: (
                <LeadAuthProtectedRoute>
                  <LeadAuth />
                </LeadAuthProtectedRoute>
              ),
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
