import React from 'react'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'



const RecipeCard = ({ recipe }) => {

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];



    return (
        <>

            <div className='bg-gray-900 rounded-xl flex flex-col p-4 gap-4 relative'>

                <img src={recipe.strMealThumb} alt="" className='rounded-md overflow-hidden object-fill ' />
                <div className='absolute bg-white justify-items-center top-6 right-5 flex gap-2 rounded-full p-1'>
                    {favourites.some((favourite) => favourite.idMeal === recipe.idMeal) ? <Heart className='text-red-500 fill-red-500' /> : <Heart className=' fill-white' />}

                </div>


                <p className='font-bold tracking-wide text-2xl'>{recipe.strMeal}</p>
                <p className='font-semibold tracking-wide text-xl'>{recipe.strArea}</p>
                <div className='flex justify-center items-center'>

                    <Link to={`/${recipe.idMeal}`} >
                        <div className='bg-red-800 text-red -800 rounded-lg  p-2 font-bold cursor-pointer text-black hover:bg-red-600 tracking-wider'> View Recipe</div>
                    </Link>
                </div>
            </div>



        </>
    )
}

export default RecipeCard
