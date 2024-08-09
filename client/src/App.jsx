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
  Concept_Strategy,
  CreateConcept_Strategy,
  Members,
  SingleConcept_Strategy,
  AddMember,
  SingleMember,
  EditMember,
  TEN,
  CreateTEN,
  EditTEN,
  PrayerGroup,
} from "./pages"

// actions
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as addCountAction } from "./pages/count/AddCount"
import { action as editCountAction } from "./pages/count/EditCount"
import { action as forgotPasswordAction } from "./pages/ForgotPassword"
import { action as profileAction } from "./pages/Profile"
import { action as createCSAction } from "./pages/concept-strategy/CreateConcept_Strategy"
import { action as createTENaction } from "./pages/ten/CreateTEN"
import { action as editTENaction } from "./pages/ten/EditTEN"

// loaders
import { loader as dashboardLoader } from "./pages/DashboardLayout"
import { loader as rcsCountsLoader } from "./pages/count/RcsCounts"
import { loader as editCountLoader } from "./pages/count/EditCount"
import { loader as deleteCountLoader } from "./pages/count/DeleteCount"
import { loader as concept_strategyLoader } from "./pages/concept-strategy/Concept_Strategy"
import { loader as createCSLoader } from "./pages/concept-strategy/CreateConcept_Strategy"
import { loader as singleCSLoader } from "./pages/concept-strategy/SingleConcept_Strategy"

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
        path: "concept_strategy",
        element: <Concept_Strategy />,
        loader: concept_strategyLoader,
      },
      {
        path: "create-cs",
        element: <CreateConcept_Strategy />,
        loader: createCSLoader,
        action: createCSAction,
      },
      {
        path: "concept_strategy/:id",
        element: <SingleConcept_Strategy />,
        loader: singleCSLoader,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "single-member/:id",
        element: <SingleMember />,
      },
      {
        path: "edit-member/:id",
        element: <EditMember />,
      },
      {
        path: "add-member",
        element: <AddMember />,
      },
      {
        path: "ten",
        element: <TEN />,
      },
      {
        path: "create-ten",
        element: <CreateTEN />,
        action: createTENaction,
      },
      {
        path: "edit-ten/:id",
        element: <EditTEN />,
        action: editTENaction,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        action: profileAction,
      },
      {
        path: "prayer-group",
        element: <PrayerGroup />,
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
