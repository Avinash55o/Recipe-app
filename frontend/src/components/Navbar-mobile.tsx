import { IoHome,IoCreate } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
function NavbarMobile() {
  return (
    <div className="">
        <nav className="">
            <ul className="flex items-center justify-evenly pt-3  bg-black2 pb-0.5 bottom-full rounded-t-md md:sr-only">
                <li className="pb-2"><a href="/"> <IoHome size={24} color="white"/> </a> </li>
                <li className="pb-2"><a href="/createrecipe"> <IoCreate size={24}color="white"/> </a> </li>
                <li className="pb-2"><a href="/savedrecipe"> <FaHeart size={24} color="white"/> </a> </li>
                <li className="pb-2"><a  href="/ownerrecipe"> <BiSolidFoodMenu size={24} color="white"/></a> </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavbarMobile