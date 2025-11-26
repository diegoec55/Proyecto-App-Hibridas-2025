import React from 'react';
import '../css/Header.css';
import LogoutBtn from './Auth/LogoutButton';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      
      <h1>Mi App de alimentos</h1>
      
      <nav className='navBar'>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        {user && (
          <>
            <a href="/">Inicio</a>
            <a href="/favoritos">Favoritos</a>
            <LogoutBtn />
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;