import React from "react";

const Login: React.FC = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className= "relative group border border-gray-300/10 rounded-md px-6 py-12 bg-neutral-800 flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-white/50 text-center">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">Password</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white "
          />
        </div>

        <button className="bg-white/10 rounded-md p-2  text-white mt-12">Login</button>

        <div className=" absolute bottom-0 left-0   justify-center h-1 w-full items-center gap-1  "> 
        <span className="bg-violet-800 w-full h-1  absolute bottom-0 left-0    rounded-b-md"></span>
        <span className="bg-violet-400 w-full h-[2px] group-hover:blur-lg blur-sm right-0 absolute bottom-0 left-0    rounded-b-md"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
