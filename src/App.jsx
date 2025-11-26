import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrarUsuario from "./components/Auth/Register";
import LogearUsuario from "./components/Auth/Login";
import RutaProtegida from "./components/RutaProtegida";
import MostrarFavoritos from "./components/MostrarFavoritos";
import FoodList from "./components/Alimentos";
import Header from "./components/Header";
import DetalleReceta from "./components/DetalleReceta";

function App() {

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element= {
            <RutaProtegida>
              <FoodList />
            </RutaProtegida>
          }
        />
        <Route path='/alimentos/:idreceta' element= {
            <RutaProtegida>
              <DetalleReceta />
            </RutaProtegida>
          }
        />
        <Route path="/favoritos" element= {
            <RutaProtegida>
              <MostrarFavoritos />
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<LogearUsuario />} />
        <Route path="/register" element={<RegistrarUsuario />} />
      </Routes>
    </Router>
  )
}

export default App
