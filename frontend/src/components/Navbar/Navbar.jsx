import { useState } from "react";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/userStore";
import { Button } from "../ui/button";
const Navbar = () => {
  const [value, setValue] = useState("");
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  // Function to handle search button click
  const handleSearch = () => {
    if (value.trim()) {
      alert(`Searching for: ${value}`);
    } else {
      alert("Please enter a search term!");
    }
  };

  console.log(user);
  return (
    <header>
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow ">
        <Link to="/" className="text-xl font-medium text-black py-2 ">
          Keep
        </Link>
        {user && (
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
        )}
        {user ? (
          <div className="flex items-center justify-between gap-2 ">
            <div className=" rounded-full  px-2.5 py-2     border-2 bg-slate-200">
              <p className="text-center font-semibold  text-lg   ">
                {user && user?.user.username.slice(0, 2).toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col  items-start ">
              <p className="font-semibold ">{user && user?.user.username}</p>
              <button
                onClick={clearUser}
                className="text-sm underline font-semibold text-slate-700"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
