import React, { useEffect } from 'react'

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_SPOONACULAR_API_KEY;

function DetalleReceta ({idreceta}) {

    // const url2 = "https://api.spoonacular.com/recipes/627987/information"
    
    useEffect(() => {
      fetchDetalle();
    }, [idreceta]);


    const fetchDetalle = async() => {
        try {
          const url = `https://api.spoonacular.com/recipes/${idreceta}/information?includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`
          const res = await fetch(url)
          const data = await res.json()
    
          console.log(data);

          
        } catch (error) {
          console.error(error);
        }
        return data
      }


  return (
    <>
      <h1>Detalle Receta</h1>
      <p>{data}</p>
    </>
  )
}

export default DetalleReceta;