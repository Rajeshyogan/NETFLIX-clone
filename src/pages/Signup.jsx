import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Services/Firebase";


const Signup = () => {
  const [remmember, setRemember] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate()

  

  const updateform=async (e)=>{
    e.preventDefault()
    try{
      await auth.createUserWithEmailAndPassword(email,password)
      navigate("/")
      alert("Signip successfully")
  
    }
    catch(err){
    console.log(err)
    }

  }

  return (
    <div className="w-full h-screen">
      <img
        className="w-full h-full  absolute object-cover "
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="///"
      />

      <div className="fixed bg-black/70 top-0 left-0 w-full h-screen" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className=" bg-black/80 max-w-[290px] md:max-w-[450px] lg:h-[600px] mx-auto rounded-lg">
          <div className="max-w-[250px] md:max-w-[320px] mx-auto py-8 md:py-16">
            <h2 className="text-xl md:text-3xl mb-4 font-nsans-bold">
              Sign Up
            </h2>

            <form onSubmit={updateform} className="mx-auto w-full">
              <input
                className="w-full p-4 my-2 bg-slate-600 text-white outline-none border-none"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required
              />
              <input
                className="w-full p-4 my-2 bg-slate-600 text-white outline-none border-none"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                required
                onChange={(e)=>setpassword(e.target.value)}
              />
              <button className="bg-red-600 w-full py-3 mt-5">Sign Up</button>
            </form>

            <div className="flex justify-between mt-4 text-slate-400">
              <p>
                <input type="checkbox" className="mr-1" checked={remmember}
                onChange={()=>setRemember(!remmember)}/>
                Remember me
              </p>
              <p>Need Help?</p>
            </div>
            <div className="flex items-center mt-3">
              <p className="text-xs sm:text-sm mr-2 md:mr-4">
                Already subcribed to Netflix?
              </p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
