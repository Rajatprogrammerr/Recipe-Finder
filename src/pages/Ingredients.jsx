import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Ingredients = () => {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some((favourite) => favourite.idMeal === idMeal);
  });

  useEffect(() => {
    // Fetch the recipe based on idMeal
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [idMeal]);

  useEffect(() => {
    // Once the recipe is fetched, extract the ingredients and their measures
    if (recipe) {
      const tempIngredients = [];
      const tempQuantity = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          tempIngredients.push(ingredient);
          tempQuantity.push(measure);
        }
      }
      setIngredients(tempIngredients);
      setQuantity(tempQuantity);
    }
  }, [recipe]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 ">

      </div>
    );
  }
  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-lg font-semibold">
        No recipe found
      </div>
    );
  }

  const addToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    let isAlreadyFavourite = favourites.some((favourite) => favourite.idMeal === idMeal);

    if (isAlreadyFavourite) {
      favourites = favourites.filter((favourite) => favourite.idMeal !== idMeal);
      setIsFavorite(false);
      toast.success("Removed from Favorites");
    } else {
      favourites.push(recipe);
      setIsFavorite(true);
      toast.success("Added to Favorites");
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  return (
    <div className="flex-1 min-h-screen py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-center bg-gray-900 rounded-lg p-6 shadow-2xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-white text-center">
              Recipe For
            </h1>
            <p className="mt-2 md:mt-0 md:ml-6 text-4xl md:text-5xl font-bold tracking-wider text-red-400 text-center">
              {recipe.strMeal}
            </p>
          </div>

          {/* Image & Ingredients (Image on left, Ingredients on right) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={recipe.strMealThumb}
                alt="recipe"
                className="w-full max-w-md rounded-3xl transform transition hover:scale-105"
              />
            </div>
            {/* Ingredients */}
            <div className="w-full md:w-1/2 bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-200">
                      {ingredient}
                    </span>
                    <span className="text-gray-500 text-md">
                      {quantity[index]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2">
              Instructions
            </h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>

          {/* YouTube Link & Favorites */}
          <div className="flex flex-col md:flex-row justify-around items-center">
            {recipe.strYoutube && (
              <div className="text-center mt-4">
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-600 transform transition hover:scale-105"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
            <div
              className="bg-red-600 gap-3 flex mt-4 rounded-full px-8 py-3 text-white hover:bg-red-600 transform transition hover:scale-105 cursor-pointer"
              onClick={addToFavourites}
            >
              {isFavorite ? (
                <>
                  <p>Remove from Favorites</p>
                  <Heart className="fill-black text-black" />
                </>
              ) : (
                <>
                  <p>Add to Favorites</p>
                  <Heart className="fill-white text-white" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
