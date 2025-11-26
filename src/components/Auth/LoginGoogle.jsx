import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

function LoginGoogle() {
    let navigate = useNavigate();

    const googleLogin = async() => {
        const proveedor = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, proveedor)
                alert("Login con Google exitoso!")
                navigate("/", { replace: true });
            } catch (err) {
                setError(err.message)
            }
        }

    return (
        <>
            <button
                onClick={googleLogin}>
                Iniciar con Google
            </button>
        </>
    )
}

export default LoginGoogle;