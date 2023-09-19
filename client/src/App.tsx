import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "@/components/ui/toaster";
import News from "./pages/News";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={"/login"} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/news" element={<News />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
