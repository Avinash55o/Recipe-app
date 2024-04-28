// import { useEffect } from "react";
import Dashboard from "../components/dashboard";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/Navbar-mobile";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
const Home = () => {
  // const [cookies, _setCookies] = useCookies();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = cookies["access_token"];

  //   if (token === "") {
  //     navigate("/login");
  //   }
  // });

  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <Dashboard />
      <div className="fixed bottom-0 w-full z-40">
        <NavbarMobile />
      </div>
      
    </div>
  );
};

export default Home;
