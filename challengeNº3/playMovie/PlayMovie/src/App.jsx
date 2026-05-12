import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import "./index.css";
import NavBar from "./componentes/Nav";
import Footer from "./componentes/Footer";
import Error404 from "./pages/Error404";
import Home from "./pages/Home/home.jsx";
import CategoriaPage from "./componentes/Categoria";
import peliculas from "./data/movies";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import AdminProtegida from "./pages/Admin/AdminProtegida";
import AboutUs from "./pages/AboutUs/AboutUs";
import Contacto from "./pages/Contacto/Contacto";

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home peliculas={peliculas} />} />
        <Route path="/home" element={<Home peliculas={peliculas} />} />
        <Route path="/inicio" element={<Home peliculas={peliculas} />} />
        <Route path="/categoria/:gender" element={<CategoriaPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<AdminProtegida />} />
        <Route path="*" element={<Error404 />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default App
