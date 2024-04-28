import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Home from "./pages/Home";
import CreateRecipe from "./pages/Create-recipe";
import SavedRecipe from "./pages/SavedRecipe";
import OwnerRecipe from "./pages/owner-recipes";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/" Component={Home} />
          <Route path="/ownerrecipe" Component={OwnerRecipe} />
          <Route path="/createrecipe" Component={CreateRecipe} />
          <Route path="/savedrecipe" Component={SavedRecipe} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
