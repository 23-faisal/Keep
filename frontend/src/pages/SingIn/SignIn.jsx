import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import useAuthStore from "@/store/userStore";
import { toast } from "sonner";

const SignIn = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-in `,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data?.success) {
        const { user, token } = response.data;

        setUser(user);
        setToken(token);

        toast(`${response.data.message}`);
        navigate("/");
      } else {
        console.log(response?.data?.message || "Sign-in failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <main className="px-4 sm:px-2 md:px-0">
      <div className="max-w-xl mt-28 mx-auto border-2 p-8 rounded-md shadow-sm shadow-button  ">
        <h1 className="text-2xl font-bold mb-6 text-center  ">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col  gap-2 ">
            <Label className="font-semibold text-md " htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className={`border p-2 rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2  relative">
            <Label className="font-semibold text-md " htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className={`border p-2 rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? (
                  <IoIosEyeOff className="w-5 h-5 text-slate-700 hover:text-slate-800" />
                ) : (
                  <IoMdEye className="w-5 h-5 text-slate-700 hover:text-slate-800" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 font-semibold text-md  text-white p-2 rounded hover:bg-blue-600"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-2 font-semibold">
          <p className="flex flex-col sm:flex-row  items-center gap-1 sm:gap-2 ">
            <span className="">Don&apos;t have an account?</span>
            <Link
              className="text-blue-500 hover:text-teal-600 transition ease-in-out duration-100 "
              to="/sign-up"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
