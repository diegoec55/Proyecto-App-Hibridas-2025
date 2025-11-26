import { useEffect, useState } from "react";
import { db, auth } from "../firebase.config";
import {  deleteDoc, doc, collection, getDocs } from "firebase/firestore"; 

function MostrarFavoritos() {
const [favoritos, setFavoritos] = useState([]);

    useEffect(()=>{
        const obtenerFavoritos = async ()=>{
            try {
                const coleccionRef = collection(db, "favoritos")
                const querySnapshot = await getDocs(coleccionRef);
                
                // 3. Iterar sobre el resultado y mapearlo a un array de objetos
                const listaFavoritos = [];
                querySnapshot.forEach((doc) => {
                    // El método .data() retorna los campos del documento
                    // También incluimos el ID del documento para identificarlo
                    listaFavoritos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                // 4. Actualizar el estado con la lista de favoritos
                setFavoritos(listaFavoritos);
                // console.log(JSON.stringify(listaFavoritos, null, 2));

            } catch (error) {
                console.error("Error al obtener los favoritos:", error);
            }
        }
        obtenerFavoritos();
    },[])

    const eliminarFav = async(id) => {
                try {
                    await deleteDoc(doc(db, "favoritos", id));
                    alert("Favorito eliminado correctamente");

                    // También puedes actualizar la lista en pantalla
                    setFavoritos(prev => prev.filter(f => f.id !== id));

                } catch (error) {
                    console.error("Error al eliminar el favorito:", error);
            }
    };

    return (
        <>
        {favoritos.length > 0 ? (
                <div>
                    <h2>Lista de Favoritos</h2>
                    {favoritos.map((favorito) => (
                        // Usar el ID como key es importante en React
                        <div key={favorito.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>

                            <p><strong>Nombre:</strong> {favorito.nombre || 'N/A'}</p>
                            <p><strong>Calorias:</strong> {favorito.calories || 'N/A'}</p>

                        <button onClick={() => eliminarFav(favorito.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="msgCarga">Cargando favoritos o no se encontraron datos.</p>
            )}
        </>
    )
}

export default MostrarFavoritos;