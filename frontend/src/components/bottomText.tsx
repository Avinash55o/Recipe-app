import {Link} from "react-router-dom";

const bottomText=({label,nextPage,to}:{label:string;nextPage:string;to:string})=>{
    return <div className="flex justify-center space-x-2 mt-3">
        <div >{label}</div>
        <Link className="underline text-blue-400" to={to}> {nextPage} </Link>
    </div>
};
export default bottomText;