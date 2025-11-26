import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FoodList from './components/Alimentos.jsx'
import Header from './components/Header.jsx'
import DetalleReceta from './components/DetalleReceta.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Clima from './components/Clima.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<FoodList/>}/>
      <Route path='/alimentos/:idreceta' element={<DetalleReceta/>}/>
    </Routes>
  </BrowserRouter>,
)
