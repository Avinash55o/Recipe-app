import axios from "axios";
import { useEffect,useState } from "react"
import { useGetUserName } from "../hooks/getUserName";
import NavbarMobile from "../components/Navbar-mobile";
import Navbar from "../components/Navbar";
const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const username = useGetUserName()
  
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.post('http://localhost:3000/saved-recipe',{username}); 
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log('yaha ho rha h galat:', error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="py-24 px-4 bg-gray-300 h-screen">
      <div className="fixed top-0 w-full z-50 left-0">
        <Navbar />
      </div>
      <div>
      <h2 className="font-jersey text-2xl text-center">Your Saved Recipes</h2>
      {savedRecipes && savedRecipes.length>0 ?(<ul className="grid grid-cols-2 gap-4">
        {savedRecipes.map((recipe: any) => (
          <div key={recipe.id} className="px-1 border rounded-xl bg-white border-white shadow-lg">
             {/* Recipe Image */}
             <img
                src={recipe.imgurl}
                className="mt-3 rounded-md mx-auto h-36 w-36 object-cover"
                alt={recipe.Name}
              />

              {/* Recipe Name */}
              <h1 className="font-medium text-xl mt-3 text-center">
                {recipe.Name}
              </h1>

              {/* Recipe Description (Limited to 2 Lines) */}
              <p className="text-gray-600 text-sm px-4 line-clamp-2 mt-2 w-full">
                {recipe.Description}
              </p>
              {/* Recipe ingredients */}
              <h1 className="text-gray-600 text-sm px-4 overflow-hidden line-clamp-2 mt-2 ">{recipe.ingredients}</h1>

              {/* Recipe Cooking time */}
              <h1 className=" text-gray-600 mt-2  px-4  text-sm">{recipe.cookingTime}</h1>

              {/* Recipe Owner */}
              <h1 className="mt-auto text-center text-sm">
                {recipe.owner}
              </h1>
              
              
          </div>
        ))}
      </ul>):(<p> no savedrecipe </p>)}
      </div>

     

      <div className="fixed bottom-0 w-full z-40 left-0"><NavbarMobile /></div>
    </div>
  )
}

export default SavedRecipe