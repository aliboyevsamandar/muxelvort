import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Header from "./components/Header";
import All from "./components/All";
import Foods from "./components/Foods";
import Drinks from "./components/Drinks";
import Connection from "./components/Connection";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Fruits from "./components/Fruits";
import Sweets from "./components/Sweets";

export default function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<All/>} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}
