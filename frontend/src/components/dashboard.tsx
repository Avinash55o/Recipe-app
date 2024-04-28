import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserName } from "../hooks/getUserName";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
interface isSaved {
  [recipeId: number]: boolean;
}
const Dashboard = () => {
  const [recipies, setRecipies] = useState([]);
  const [isSaved, setIsSaved] = useState<isSaved>({});
  const username = useGetUserName();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/recipe");

      if (response.status === 200) {
        setRecipies(response.data.response);
      }
    }

    fetchData();
  }, []);

  const handleSave = async (id: number) => {
    const response = await axios.put("http://localhost:3000/recipe/recipe", {
      username,
      recipeId: id,
    });

    if (response.status === 200) {
      setIsSaved((prevState) => ({
        ...prevState,
        [id]: true, // Set the saved status for this recipe ID to true
      }));
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="">
        <span className="md:flex md:justify-between md:items-center flex justify-center items-center relative">
          <span
            className="absolute inset-0 bg-cover bg-center  h-full z-0 "
            // style={{ backgroundImage: `url('/images/food3.jpg')` }}
          ></span>
          <span className="relative font-jersey pt-24 pb-9 mx-24 md:p-40  md:mx-40 text-center font-medium text-brown  text-xl">
            Step into our kitchen of endless flavors. Welcome!
          </span>
        </span>
      </div>

      <div className="p-4 border border-gray-500 bg-gray-500 rounded-t-3xl flex  flex-col ">
        <p className="text-white text-center font-jersey text-xl">Recepies you can't miss!</p>

        {/* ALL THE  RECIPE BOXES */}
        <div className="grid grid-cols-2 md:grid md:grid-cols-5 ease-in-out duration-300 pt-8 gap-4">
          {recipies.map((recipe: any) => (
            // CHANGE THE SINGLE BOXES
            <div
              key={recipe.id}
              className="px-1 w-full border rounded-xl bg-white border-white shadow-lg flex flex-col hover:scale-110 transition-all duration-300 ease-in-out"
            >
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
              <p className="text-gray-600 text-sm px-4 overflow-hidden line-clamp-2 mt-2">
                {recipe.Description}
              </p>

              {/* Recipe Owner */}
              <h1 className="mt-auto mb-2 text-center text-sm">
                {recipe.owner}
              </h1>

              {/* Save Button */}
              <button
                className="self-end pr-3 pb-2 text-gray-600 hover:text-gray-800 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-110"
                onClick={() => handleSave(recipe.id)}
              >
                {isSaved[recipe.id] ? (
                  <FcLike size={20} />
                ) : (
                  <FcLikePlaceholder size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
