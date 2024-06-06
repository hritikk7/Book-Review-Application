import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  console.log(email, password);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("called handle login");
    if (password === "" || email === "") {
      setErrMsg("Fill all the Fileds");
    }
    loginCall();
  };
  const loginCall = async () => {
    const apiUrl = "https://book-review-application-backend.vercel.app/api/user/login";
    try {
      const data = {
        email: email,
        password,
      };
      const response = await axios.post(apiUrl, data);
      console.log("response.data", response.data);

      if (response) {
        navigate("/home");
      }
      if (response.data.message === "Login Succesfull") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
      }
    } catch (err) {
      console.log("Error Loggin in", err);
      setErrMsg("Error Loggin in");
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "user not found"
      ) {
        setErrMsg("User not found");
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message === "password dosent match"
      ) {
        setErrMsg("Incorrect Password");
      } else {
        console.log("Error Logging User: ", err);
        setErrMsg("Error Logging User");
      }
    }
  };
  return (
    <div className=" px-8 flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access your account.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full"
              placeholder="Enter your username"
            />
          </div> */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={(e) => handleLogin(e)}
          >
            Sign in
          </Button>
          <div className="flex flex-col text-center">
            <Link to={"/signup"} className="text-sm font-medium text-gray-600">
              Don't have an account?{" "}
              <span className=" text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                {" "}
                Sign Up{" "}
              </span>
            </Link>
            <span className="font-bold text-sm text-red-600">{errMsg}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
