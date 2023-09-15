import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import Signup from "./pages/Signıup";
import News from "./pages/News";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<News />} />
      </Route>
    </Routes>
  );
}

export default App;
