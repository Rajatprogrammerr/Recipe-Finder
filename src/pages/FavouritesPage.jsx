import React from 'react'
import RecipeCard from '../components/RecipeCard'

const FavouritesPage = () => {

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return (
        <>
            <div className=' flex-1 md:p-4 pb-20 pt-4 px-2 min-h-screen'>
                <div className='max-w-screen-lg mx-auto'>
                    <p className='font-bold text-3xl md:text-5xl my-4 text-center'>My Favorites</p>

                    {favourites.length === 0 && (
                        <div className='h-[80vh] flex flex-col items-center gap-4'>
                            <img src='/404.svg' className='h-3/4' alt='404 svg' />
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {favourites.map((recipe) => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

export default FavouritesPage
