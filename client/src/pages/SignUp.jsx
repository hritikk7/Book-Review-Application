import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    const apiUrl = "http://127.0.0.1:8080/api/user/register";
    try {
      const data = {
        email,
        password,
      };
      const res = await axios.post(apiUrl, data).then((res) => {
        console.log(res);
        if (res.data.message === "Registration Succesfull") {
          setEmail("");
          setPassword("");
          navigate("/login");
        }
      });
    } catch (err) {
      console.log("Error Regestring User: ", err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "User already exists !!"
      ) {
        setErrMsg("User already exists");
        // alert("User already exists. Please use a different email.");
      } else {
        console.log("Error Regestring User: ", err);
        setErrMsg("Error Regestring User");
      }
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (password === "" || email === "") {
      setErrMsg("Fill all the Fileds");
    }
    registerUser();
  };
  return (
    <div className="px-8 flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            SignUp
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your account to get started
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={(e) => {
              handleSignup(e);
            }}
          >
            Sign Up
          </Button>
          <div className="flex flex-col text-center">
            <Link to={"/"} className="text-sm font-medium text-gray-600">
              Already have an account?{" "}
              <span className=" text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                {" "}
                Login{" "}
              </span>
            </Link>
            <span className="text-sm font-bold text-red-600">{errMsg}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
