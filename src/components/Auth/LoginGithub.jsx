import { useNavigate } from "react-router-dom";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";

function LoginGithub() {
    const [error, setError] = useState("");
    let navigate = useNavigate();
    
    const githubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider)
            alert("Login con GitHub exitoso!")
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.message)
        }
    }

    
    return (
        <>
        <button
                onClick={githubLogin}>
                Iniciar con GitHub
            </button>
        </>
    )
}

export default LoginGithub;