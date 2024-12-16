import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const SignUp = () => {
  const { toast } = useToast();
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
        `${import.meta.env.VITE_API_URL}/api/auth/sign-up`,
        data
      );

      if (response.data.success) {
        toast({
          title: "Sign up successful",
          description: response?.data.message,
          variant: "success",
        });
        navigate("/sign-in");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="px-4 sm:px-2 md:px-0">
      <div className="max-w-xl mt-28 mx-auto border-2 p-8 rounded-md shadow-sm shadow-button">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold text-md" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
              className={`border p-2 rounded ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold text-md" htmlFor="email">
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
          <div className="flex flex-col gap-2 relative">
            <Label className="font-semibold text-md" htmlFor="password">
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
            className="w-full bg-blue-500 font-semibold text-md text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-2 font-semibold">
          <p className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>Already have an account?</span>
            <Link
              className="text-blue-500 hover:text-teal-600 transition ease-in-out duration-100"
              to="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
