import Heading from "../components/Header";
import SubHeading from "../components/subHeading";
import InputBox from "../components/IputBox";
import BottomText from "../components/bottomText";

const Signup = () => {
  return (
    <div className="px-14 pt-10 text-center bg-skin h-screen">
      <div className="rounded-md bg-white">
        <div className="bg-darkGray pt-3 rounded-md">
          <Heading label={"sign up"} />

          <SubHeading label={"enter your information"} />
        </div>

        <InputBox kaam="signup" />

        <BottomText
          label={"Already have an account"}
          nextPage={"login"}
          to={"/login"}
        />
      </div>
    </div>
  );
};
export default Signup;
