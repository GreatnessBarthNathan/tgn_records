import { RouterProvider, createBrowserRouter } from "react-router-dom"

// pages
import Landing from "./pages/Landing"
import {
  Register,
  Login,
  Dashboard,
  AddCount,
  AllCounts,
  AddFinRec,
  AllFinRecs,
  RcsCounts,
  EditCount,
  DeleteCount,
  ForgotPassword,
  Error,
  Profile,
  Settings,
} from "./pages"

// actions
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as addCountAction } from "./pages/AddCount"
import { action as editCountAction } from "./pages/EditCount"
import { action as forgotPasswordAction } from "./pages/ForgotPassword"
import { action as profileAction } from "./pages/Profile"

// loaders
import { loader as dashboardLoader } from "./pages/DashboardLayout"
import { loader as allCountsLoader } from "./pages/AllCounts"
import { loader as rcsCountsLoader } from "./pages/RcsCounts"
import { loader as editCountLoader } from "./pages/EditCount"
import { loader as deleteCountLoader } from "./pages/DeleteCount"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
    index: true,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
    action: forgotPasswordAction,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
    loader: dashboardLoader,
    children: [
      {
        index: true,
        path: "add-count",
        element: <AddCount />,
        action: addCountAction,
      },
      {
        path: "all-counts/:id",
        element: <AllCounts />,
        loader: allCountsLoader,
      },
      {
        path: "add-finance",
        element: <AddFinRec />,
      },
      {
        path: "all-finances",
        element: <AllFinRecs />,
      },
      {
        path: "rcs-counts",
        element: <RcsCounts />,
        loader: rcsCountsLoader,
      },
      {
        path: "edit-count/:id",
        element: <EditCount />,
        loader: editCountLoader,
        action: editCountAction,
      },
      {
        path: "delete-count/:id",
        element: <DeleteCount />,
        loader: deleteCountLoader,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        action: profileAction,
      },
      {
        path: "settings/:id",
        element: <Settings />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}
export default App
