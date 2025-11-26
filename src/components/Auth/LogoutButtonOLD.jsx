import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

function LogoutBtn() {
    const [userEmail, setUserEmail] = useState(null);

    console.log(auth);
    

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const logout = async () => {
        await signOut(auth);
        alert("Sesión cerrada correctamente");
    };

    return (
        <>
            <button onClick={logout}>Cerrar Sesión</button>
            <div>
                <h3 style={styles.email}>{userEmail ? `Usuario: ${userEmail}` : "No hay usuario logueado"}</h3>
            </div>
        </>
    );
}

export default LogoutBtn;

const styles = {
    email: {
        color: "black",
    },
};