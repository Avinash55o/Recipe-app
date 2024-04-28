import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [cookies, setcookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  let [isOpen,setIsOpen]=useState(false);

  const logout = () => {
    setcookies("access_token", ""); //we have set the cookies to empty
    navigate("/login");
  };



  return (
    <div>
      <nav className="bg-black2 pt-5 pb-4 pl-2 rounded-b-sm shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <span className="text-2xl text-white">
            <img
              className="h-10 mr-2 inline rounded-full "
              src="https://imgs.search.brave.com/dpnfKc5G5cVW9LnZpRU1Rr0kxwRUt7twsconY3LUyGI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M3L2E4/Lzk0L2M3YTg5NDU0/OGZhZGY1YmU5MWE4/NzFkZjYyY2IwODIz/LmpwZw"
            />
            recipes
          </span>
          <button onClick={()=>{setIsOpen(!isOpen)}} className="text-3xl cursor-pointer mx-2 md:hidden block">
         
          {isOpen ? <IoCloseSharp size={24} color="white" /> : <IoMenuSharp size={24} color="white" />}
          </button>
        </div>

        {isOpen && <ul  className={`md:flex text-white md:items-center z-[-1] md:z-auto md:static absolute bg-black2 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 md:opacity-100 opacity-0 transition-all ease-in-out duration-300 ${
            isOpen ? 'top-[60px] opacity-100' : ''
          }`}
          style={{ zIndex: 100 }}>
          <li className="mx-4 my-6 md:my-0">
            <Link className="text-xl hover:text-text duration-500" to="/">
              Home
            </Link>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <Link
              className="text-xl hover:text-text duration-500"
              to="/createrecipe"
            >
              Createrecipe
            </Link>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <Link
              className="text-xl hover:text-text duration-500"
              to="/savedrecipe"
            >
              Saved
            </Link>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <Link
              className="text-xl hover:text-text duration-500"
              to="/ownerrecipe"
            >
              OwnerRecipe
            </Link>
          </li>

          <button className="bg-button text-white font-[poppins] duration-500 px-6 py-2 mx-4 hover:bg-extra hover:text-text rounded-md">
            {!cookies.access_token ? (
              <Link to="/login">login</Link>
            ) : (
              <button onClick={logout}>logout</button>
            )}
          </button>
        </ul>}
      </nav>
    </div>
  );
};

export default Navbar;
