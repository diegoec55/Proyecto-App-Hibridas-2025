import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FoodList from './components/Alimentos.jsx'
import Header from './components/Header.jsx'
// import Clima from './components/Clima.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    {/* <Clima /> */}
    <FoodList />
  </StrictMode>,
)
