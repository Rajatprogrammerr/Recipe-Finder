import SideBar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavouritesPage";
import Ingredients from "./pages/Ingredients";
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <>
      <div className='flex bg-black md:bg-black sm:bg-black'>
        <Toaster/>
        <SideBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/favorite' element={<FavoritesPage />} />
          <Route path='/:idMeal' element={<Ingredients />} />
        </Routes>
      </div>

    </>
  )
}

export default App
