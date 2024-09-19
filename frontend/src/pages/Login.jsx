import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrent] = useState("Login");
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currentState === 'Signup') {
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        // console.log(response.data);
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        } else {
          toast.error(response.data.msg)
        }
        
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        console.log(response.data);
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        } else {
          toast.error(response.data.msg)
        } 
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.msg)
    }
  };

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="w-full mx-auto mt-14">
      <form
        onSubmit={onsubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input onChange={(e) => setName(e.target.value)}
          value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}
        <input onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="E-mail"
          required
        />
        <input onChange={(e) => setPassword(e.target.value)}
        value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password?</p>
          {currentState === "Login" ? (
            <p onClick={() => setCurrent("Signup")} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrent("Login")} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>
        <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Sign-in" : "Sign-up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
