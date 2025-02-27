import React from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "motion/react";
import PurchaseForm from "./PurchaseForm";
import { useFormStore } from "../../state_manager/FormState";

const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore();

  return (
    <div className=" text-white  ">
      <div className="flex justify-between items-center w-full ">
        <h1 className="heading-text select-none ">Purchase</h1>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="hover:bg-zinc-800 p-2 rounded-full"
        >
          <FaPlus onClick={() => setShowForm()} />
        </motion.div>
      </div>

      {showForm && (
        <div className="absolute  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-sm left-0">
          <div className="lg:w-1/2 md:w-8/12  mx-auto">
            <PurchaseForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
