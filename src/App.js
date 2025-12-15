import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Search from "./components/Search";
import Header from "./components/Header";

import Home from "./pages/Home";
import PetPage from "./components/PetPage";
import AddOrderPage from "./pages/AddOrderPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pet/:id" element={<PetPage />} />
          <Route path="/add" element={<AddOrderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
