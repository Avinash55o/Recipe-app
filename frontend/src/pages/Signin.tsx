import Heading from "../components/Header";
import SubHeading from "../components/subHeading";
import BottomText from "../components/bottomText";
import InputBox from "../components/IputBox";

const Login = () => {
  return (
    <div>
      <div className="px-14 pt-10 text-center bg-skin h-screen">
        <div className="rounded-xl bg-white shadow-md">
          <div className="bg-darkGray rounded-md">
            <Heading label={"sign in"} />

            <SubHeading label={"enter your information"} />
          </div>

          <InputBox kaam="login" />

          <BottomText
            label={"New here?"}
            nextPage={"Register"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
