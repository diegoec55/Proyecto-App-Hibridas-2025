import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle";
import LoginGithub from "./LoginGithub";
import '../../css/Login.css';

function LogearUsuario() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const login = async(e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert("Login exitoso!")
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message)
        }
    }

return (
    <div className="formContainer">
        <h1 className="loginTitle">Ingresá a nuestra página</h1>
        <form onSubmit={login}>
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
            <button type="submit">Ingresar</button>
        </form>
        <div className="gGontainer">
            <LoginGoogle/>
            <LoginGithub/>
        </div>
    </div>
)
}

export default LogearUsuario;
