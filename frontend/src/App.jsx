 import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;