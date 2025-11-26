import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Login.css';
import LoginGoogle from "./LoginGoogle";
import LoginGithub from "./LoginGithub";

function RegistrarUsuario() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const registro = async(e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert("Registro exitoso!")
            navigate("/login", { replace: true });
            // ver si hace falta setear mail y pass en vacio
        } catch (err) {
            setError(err.message)
        }
    }

return (
    <div>
        <h1 className="loginTitle">Registrate en nuestra Web</h1>
        <form onSubmit={registro}>
            <input 
            type="email" 
            name="email" 
            placeholder="Ingrese su email"
            valor={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            required
            />
            <input 
            type="password" 
            name="password" 
            placeholder="Ingrese su contraseña"
            valor={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            required
            />
            <button type="submit">Registrarse</button>
        </form>
        <div className="gGontainer">
            <LoginGoogle/>
            <LoginGithub/>
        </div>
    </div>
)
}

export default RegistrarUsuario;