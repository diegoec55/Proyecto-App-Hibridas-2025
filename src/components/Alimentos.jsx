import React, { useEffect, useState } from "react";
import '../../public/css/FoodList.css';

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_SPOONACULAR_API_KEY;
const WEATHER_API_KEY = import.meta.env.VITE_API_WEATHER_API_KEY;

function FoodList() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [temperatura, setTemperatura] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const temp = await fetchWeather('Rosario');
            setTemperatura(temp);

            let minCals, maxCals;
            
            // Lógica: Si la temperatura es menor a 20°C, buscamos alimentos con MÁS de 250 cal.
            if (temp < 20) {
                // Clima frío: alta energía (250 a 600 cal)
                minCals = 250;
                maxCals = 600; 
                console.log(`Temp ${temp}°C. Buscando > 250 calorías.`);
            } else {
                // Clima cálido: baja energía (50 a 250 cal)
                minCals = 50;
                maxCals = 250; 
                console.log(`Temp ${temp}°C. Buscando < 250 calorías.`);
            }

            await fetchFoods(minCals, maxCals);
            
        } catch (err) {
            console.error("Error general en el proceso:", err);
            setError(`Error: ${err.message || "No se pudieron obtener los datos (Clima o Alimentos)"}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async (ciudad) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${WEATHER_API_KEY}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Error al obtener el clima de ${ciudad}. Estado: ${res.status}`);
        }
        const data = await res.json();
        return data.main.temp;
    };


    const fetchFoods = async (minCals, maxCals) => {
        const res = await fetch(
            `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${minCals}&maxCalories=${maxCals}&number=10&apiKey=${SPOONACULAR_API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`Error al obtener alimentos. Estado: ${res.status}`);
        }
        
        const data = await res.json();
        
        const simplified = data.map((item) => ({
            id: item.id,
            title: item.title,
            calories: parseInt(item.calories, 10), 
        }));
        setFoods(simplified);
    };

    if (loading) return <div className="food-list-message loading">Cargando datos (Clima y Alimentos)...</div>;
    if (error) return <div className="food-list-message error"> Error: {error}</div>;

    const recomendacion = temperatura < 20 ? "Clima Fresco, ¡Necesitas Energía!" : "Clima Cálido, ¡Recomendamos algo ligero!";
        
    const rangoCalorias = temperatura < 20 ? "250-600 calorías" : "50-250 calorías";

    return (
        <div className="food-list-container">
            <h2 className="main-title">Sugerencias Alimenticias</h2>
            
            <div className="weather-info">
                <p>Temperatura Actual en Rosario: 
                   <span className={`temp-value ${temperatura < 20 ? 'frio' : 'calor'}`}>
                       {temperatura.toFixed(1)}°C
                   </span>
                </p>
                <p className="recommendation-text">{recomendacion}</p>
            </div>

            
            <h3>Alimentos Recomendados ({rangoCalorias})</h3>
            
            <ul className="food-list">
                {foods.length > 0 ? (
                    foods.map((food) => (
                        <li key={food.id} className="food-item">
                            <span className="food-title">{food.title}</span> 
                            <span className="food-calories">{food.calories} kcal</span>
                        </li>
                    ))
                ) : (
                    <p className="no-results">No se encontraron alimentos en este rango calórico.</p>
                )}
            </ul>
        </div>
    );
}

export default FoodList;