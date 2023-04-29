import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
const NonPrivateRoute = () => {
  const auth = localStorage.getItem("token");
  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route exact path="/login" element={<NonPrivateRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route exact path="/register" element={<NonPrivateRoute />}>
          <Route path="/register" element={<Login />} />
        </Route>
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
