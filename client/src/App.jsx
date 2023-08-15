import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navigation from "./component/Navigation";
import { Box } from "@mui/material";
import { useState } from "react";
import Login from "./page/Login";
import Home from "./page/Home";
import Friends from "./page/Friends";
import SavedPosts from "./page/SavedPosts";

function App() {
  const [auth, setAuth] = useState(true);
  const location = useLocation();

  // console.log("location", location);
  return (
    <>
      {!auth ? (
        <Login />
      ) : (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box sx={{ flexGrow: 1 }}>
            {location !== "/login" && <Navigation />}
          </Box>

          {/* Routing */}
          <Box sx={{ flexGrow: 10 }}>
            <Routes>
              <Route index={true} path="/home" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/savedPosts" element={<SavedPosts />} />
              <Route path="/notifications" element={<div>notification</div>} />
              <Route path="/logout" element={<div>Logout</div>} />
            </Routes>
            {/* <RouterProvider router={router} /> */}
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;

// const router = createBrowserRouter([
//   // home,friends, savedPosts, notification,login
//   {
//     path: "/",
//     element: <div>Navigation</div>,
//     children: [
//       {
//         index: true,
//         path: "login",
//         element: <div>login</div>,
//       },
//       {
//         path: "/home",
//         element: <div>home</div>,
//       },
//       {
//         path: "/friends",
//         element: <div>friends</div>,
//       },
//       {
//         path: "/savedPosts",
//         element: <div>savedPosts</div>,
//       },
//       {
//         path: "/notification",
//         element: <div>notification</div>,
//       },
//     ],
//   },
// ]);
// console.log(router);
