import React from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "motion/react";
import { Input } from "../../components/ui";

const Purchase: React.FC = () => {
  return (
    <div className=" text-white ">
      <div className="flex justify-between items-center w-full ">
        <h1 className="heading-text select-none ">Purchase</h1>
        <motion.div 
        whileTap={{scale: 0.9}}
        className="hover:bg-zinc-800 p-2 rounded-full">
          <FaPlus />
        </motion.div>
      </div>
        <Input style="w-full bg-white"/>
        <Input label="name" style="w-full bg-white "/>
    </div>
  );
};

export default Purchase;
