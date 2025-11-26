import { useState, useEffect } from "react";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

function LogoutBtn() {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log("datos de user: ", user);
            
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        alert("Sesión cerrada correctamente");
    };

    return (
        <>
            <div>
                <h3 style={styles.email}>{userEmail ? `${userEmail}` : "No hay usuario logeado"}</h3>
            </div>
            <button style={styles.boton} onClick={logout}>Cerrar Sesión</button>
        </>
    );
}

export default LogoutBtn;


const styles = {
    email: {
        marginTop: "0",
        marginBottom: "0",
        marginLeft: "50px",
        fontSize: 16,
        color: "orange",
    },
    boton: {
        backgroundColor: "transparent",
    }
};