import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/DetalleReceta.css';
import { db, auth } from "../firebase.config";
import { addDoc, doc, collection, getDocs } from "firebase/firestore";

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_SPOONACULAR_API_KEY;

export default function DetalleReceta() {
  const { idreceta } = useParams(); // <-- obtiene el ID desde la URL
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      const res = await fetch(
        // `http://localhost:3000/alimentos`
        `https://api.spoonacular.com/recipes/${idreceta}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await res.json();
      setReceta(data);   // SACAR EL ARRAY CUANDO ESTE LISTO"""""""""""""""""""""""""
    };
    fetchReceta();
  }, [idreceta]);

  if (!receta) return <p>Cargando...</p>;

  const guardarFavorito = async (receta) => {

    // console.log(JSON.stringify(receta,null,4));
    // console.log(auth);
    // console.log("userId=: ",auth.currentUser.uid);

    try {
      await addDoc(collection(db, "favoritos"), {
        userId: auth.currentUser.uid,
        nombre: receta.title,
        calories: receta.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount
                ?? "No disponible",
        timestamp: new Date()
      });
      alert(`Receta "${receta.title}" guardada en favoritos`);
    } catch (error) {
      console.error("Error al guardar la receta:", error);
    }
  };

  // console.log("Info en receta: ", receta);
  const ingredientes = receta.extendedIngredients
  // console.log(ingredientes);

  //detectar formato de instrucciones----------------------
  function renderInstructions(instructions) {
    if (!instructions) return <p>No hay instrucciones disponibles.</p>;

    // Detecta si contiene HTML real
    const containsHTML = /<\/?[a-z][\s\S]*>/i.test(instructions);

    if (containsHTML) {
      // Caso 1: instrucciones en HTML
      return (
        <div
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      );
    }

    // Caso 2: instrucciones en texto plano -> convertir líneas
    const lines = instructions.split("\n").filter(line => line.trim() !== "");

    return (
      <ul>
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    );
  }




  return (
    <div className="container-details">
      <h2>{receta.title}</h2>
      <div className="infoDetailFood">
        <p>Porciones: {receta.servings}</p>
        <p>Listo en: {receta.readyInMinutes} minutos</p>
        <p>Calorias: {receta.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount
          ?? "No disponible"}</p>
      </div>

      <div className="imgIngreContainer">
        <img src={receta.image} alt={receta.title} />

        <div className="ingreTittleContainer">
          <h3 className="ingredientTittle">Ingredientes:</h3>
          <div className="ingredientContainer">
            {ingredientes.length > 0 ? (
              ingredientes.map((ingredient) => (
                <Link key={ingredient.id} to={`/alimentos/${ingredient.id}`}>
                  <li className="ingredient-item">
                    <span className="ingredient-title">{ingredient.original}</span>

                    {/* <button>Ver receta</button> */}
                    {/* <span className="ingredient-calories">{ingredient.amount} {ingredient.unit}</span> */}
                  </li>
                </Link>
              ))
            ) : (
              <p className="no-results">No se encontraron alimentos en este rango calórico.</p>
            )}
          </div>
        </div>
      </div>


      <h3 className="instructionsTittle">Instrucciones</h3>
      <div className="instructionsContainer">
        {renderInstructions(receta.instructions)}
      </div>
      <button
        onClick={() => guardarFavorito(receta)}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
          marginTop: "5px",
          marginLeft: "5px"
        }}
      >
        Favoritos
      </button>
    </div>
  );
}