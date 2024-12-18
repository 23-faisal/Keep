import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SingIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";
import RestrictedRoute from "./pages/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Restricted Route */}

          <Route element={<RestrictedRoute />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* Private Route (accessible only when authenticated) */}

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </>
  );
}

export default App;
