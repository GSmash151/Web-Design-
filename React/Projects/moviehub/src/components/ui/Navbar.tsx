import logo from "../../assets/images/logo.png";
import { Input } from "./input";

export const Navbar = () => {
  return (
    <div className="flex justify-between md:px-10 sm:px-5 px-5 items-center gap-3 text-xl my-3">
    <img 
    src={logo} 
    alt="Logo" 
    className="md:h-14 sm:h-9 hover:opacity-80 cursor-pointer"
    />
    <div className="flex gap-3">
        <form action="">
            <Input
            placeholder="Search..."
            className="border-gray-500 rounded-2xl md:w-fit sm:w-[30vw]" 
            />
        </form>
    </div>
    </div>
  )
}
