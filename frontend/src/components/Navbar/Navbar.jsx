import { useState } from "react";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
const Navbar = () => {
  const [value, setValue] = useState("");

  // Function to handle search button click
  const handleSearch = () => {
    if (value.trim()) {
      alert(`Searching for: ${value}`);  
    } else {
      alert("Please enter a search term!");
    }
  };
  return (
    <header>
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow ">
        <h1 className="text-xl font-medium text-black py-2 ">Keep</h1>
        <div className="relative ">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search Notes"
          />
          {value && (
            <IoCloseSharp
              onClick={() => setValue("")}
              className="absolute right-10 top-2.5 cursor-pointer text-red-600"
            />
          )}
          <FaSearch
            onClick={handleSearch}
            className="absolute right-2.5 top-2.5 cursor-pointer text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between gap-2 ">
          <div className=" rounded-full  px-2.5 py-2     border-2 bg-slate-200">
            <p className="text-center font-semibold  text-lg   ">FA</p>
          </div>
          <div className="flex flex-col  items-start ">
            <p className="font-semibold ">Faisal Ahmed</p>
            <button className="text-sm underline font-semibold text-slate-700">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
