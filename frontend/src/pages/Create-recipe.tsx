import { FormEvent, useState } from "react";
import { useGetUserName } from "../hooks/getUserName";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarMobile from "../components/Navbar-mobile";
import Navbar from "../components/Navbar";

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [cookingTime, setCookingTime] = useState<string>("");
  const navigate = useNavigate();

  // const handleChange = (
  //   e: { target: { value: string } },
  //   setFunc: (something: string) => void
  // ) => {
  //   setFunc(e.target.value);
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = useGetUserName();
    setOwner(username);

    const response = await axios.post("http://localhost:3000/recipe", {
      userName: owner,
      recipeName,
      description,
      ingredients,
      imgurl: imageUrl,
      cookingTime,
    });

    if (response.status === 200) {
      window.alert("kaam tamaam!");
      navigate("/");
    } else {
      window.alert("hagg diya!");
    }
  };

  return (
    <div className="p-4 bg-gray-300 h-screen ">
      <div className="fixed top-0 w-full left-0">
        <Navbar />
      </div>
      <div>
        <form
          className=" max-w-md mx-auto p-6 my-20 bg-white shadow-md rounded-xl "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Add New Recipe
          </h2>

          {/* Recipe Name Input */}
          <div className="mb-4">
            <label
              htmlFor="recipeName"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              name="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter recipe name"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter recipe description (max 2 lines)"
              required
            ></textarea>
          </div>

          {/* Ingredients Input */}
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={5}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ingredients (one per line)"
              required
            ></textarea>
          </div>

          {/* Image URL Input */}
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Cooking Time Input */}
          <div className="mb-4">
            <label
              htmlFor="cookingTime"
              className="block text-sm font-medium text-gray-700"
            >
              Cooking Time (minutes)
            </label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter cooking time in minutes"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Recipe
          </button>
        </form>
      </div>

      <div className="fixed bottom-0 w-full z-40 left-0">
        <NavbarMobile />
      </div>
    </div>
  );
};

export default CreateRecipe;
