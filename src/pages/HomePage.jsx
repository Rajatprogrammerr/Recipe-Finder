import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import { useState } from 'react';
import Ingredients from './Ingredients';

// const APP_KEY = "96dee8a7a8474871997c6308dd34d63c";



const HomePage = () => {

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const recipeFinder = async (serachQuery) => {
        setLoading(true)
        setRecipes([])
        try {
            // const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_KEY}&query=${serachQuery}`)
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${serachQuery}`)
            const data = await res.json()
            setRecipes(data.meals)
            console.log(`Home Page`, data.meals)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        recipeFinder("cakes")
    }, [])


    const handleSearchRecipe = (e) => {
        e.preventDefault()
        const query = e.target[0].value
        recipeFinder(query)
    }
    return (
        <>
            <div className='flex-1 m-6'>
                <form className='flex items-center justify-center' onSubmit={handleSearchRecipe}>
                    <label className='input w-[50vw]   items-center shadow-md flex gap-4'>
                        <Search size={'24'} />
                        <input type="text"
                            placeholder='What do you want to cook today?'
                            className='text-white grow p-2 '
                        />
                    </label>
                </form>
                <div className='flex flex-col gap-4 mx-10 my-4'>
                    <h1 className='text-4xl font-bold tracking-normal'>Recommended Recipe</h1>
                    <h1 className='tracking-wider'>Popular Choices </h1>
                </div>
                <div className='mx-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
                        {!loading &&

                            recipes.map((recipe, index) => (
                                <div key={recipe.idMeal || index}>
                                    <RecipeCard recipe={recipe} />
                                    
                                </div>
                            ))}

                        {loading && (
                            [...Array(9)].map((index) => (

                                <div className="flex w-52 flex-col gap-4" key={index}>
                                    <div className='skeleton h-32 w-full'></div>
                                    <div className='flex justify-between'>
                                        <div className='skeleton h-4 w-28'></div>
                                        <div className='skeleton h-4 w-24'></div>
                                    </div>
                                    <div className='skeleton h-4 w-1/2'></div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>



        </>
    )
}

export default HomePage
