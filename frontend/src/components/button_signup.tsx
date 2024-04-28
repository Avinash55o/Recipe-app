import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Button = ({
  email,
  firstName,
  lastName,
  password,
  kaam,
}: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  kaam: string
}) => {
  const [ _cookies ,setcookies]=useCookies();
  const navigate = useNavigate();

  return (
    <button className="mt-7 px-4 rounded bg-sky-500"
      onClick={async () => {
        const response = await axios.post(`http://localhost:3000/${kaam}`, {
          userName: email,
          firstName,
          lastName,
          password,
        });

        if (response.status === 200) {
          setcookies("access_token", response.data.token)
          window.localStorage.setItem("username", response.data.username)
          navigate("/");
          window.alert("kaam ho gya!!");
        }
        else{
            window.alert("kuch to haga!!");
        }

      }}
      type="button"
    >
      {kaam==="signup"?(<div> signup</div>):(<div>login</div>)}
    </button>
  );
};
export default Button;
