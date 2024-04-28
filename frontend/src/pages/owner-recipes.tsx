import { useEffect, useState } from "react";
import { useGetUserName } from "../hooks/getUserName";
import NavbarMobile from "../components/Navbar-mobile";
import Navbar from "../components/Navbar";
const OwnerRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const username = useGetUserName();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipes/${username}`
        );

        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes || []);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="py-20 px-4 bg-gray-300 h-screen">
      <div className="fixed top-0 w-full z-50 left-0">
        <Navbar />
      </div>

      <div className="">
      <h1 className="font-jersey text-xl font-medium mb-3 text-center">OWNER'S RECIPES</h1>
      {recipes && recipes.length>0 ? (<div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe: any, index: number) => (
          <div key={index} className="px-1 border rounded-xl bg-white border-white shadow-lg text-center flex flex-col h-80 overflow-hidden">
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
      </div>):(<p>no recipes found</p>)}
      </div>
      <div className="fixed bottom-0 w-full z-40 left-0"><NavbarMobile /></div>
    </div>
  );
};

export default OwnerRecipe;
