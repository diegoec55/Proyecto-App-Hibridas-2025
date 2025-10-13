import React from 'react';
import '../../public/css/Header.css';

function Header() {
  return (
    <header className="header">
      
      <h1>Mi App de alimentos</h1>
      
      <nav>
        <a href="/">Inicio</a>
        {/* <a href="/servicios">Servicios</a>
        <a href="/contacto">Contacto</a> */}
      </nav>
    </header>
  );
}

export default Header;