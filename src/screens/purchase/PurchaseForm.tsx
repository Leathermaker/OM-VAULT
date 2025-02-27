import React, { useState } from "react";
import { Input } from "../../components/ui";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import Button from "../../components/ui/Button";
import { useFormStore } from "../../state_manager/FormState";
import { RxCross2 } from "react-icons/rx";

type InstallmentType = {
  date: string;
  rate: number | null;
};

type PurchaseDataType = {
  productName: string;
  price: number | null;
  quantity: number | null;
  discount: number | null;
  tax: number | null;
  supplier: string;
  supplierContact: string;
  supplierEmail: string;
  supplierAddress: string;
  shippingAddress: string;
  paymentStatus: string;
  paymentMethod: string;
  orderingDate: string;
  installments: InstallmentType[];
};

const PurchaseForm: React.FC = () => {
  const {  setShowForm } = useFormStore();
  const [purchaseData, setPurchaseData] = useState<PurchaseDataType>({
    productName: "",
    price: 0,
    quantity: 0,
    discount: 0,
    tax: 0,
    supplier: "",
    supplierContact: "",
    supplierEmail: "",
    supplierAddress: "",
    shippingAddress: "",
    paymentStatus: "null",
    paymentMethod: "null",
    orderingDate: "",
    installments: [{ date: new Date().toISOString().split("T")[0], rate: 0 }]
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPurchaseData((prev) => ({ ...prev, [name]: value }));
    console.log(purchaseData);
  };

  const handleInstallmentChange = (index: number, value: number) => {
    setPurchaseData((prev) => {
      const newInstallments = [...prev.installments];
      newInstallments[index].rate = value;
      return { ...prev, installments: newInstallments };
    });
  };

  const addInstallment = () => {
    const lastInstallment = purchaseData.installments.at(-1);
    if (lastInstallment && lastInstallment.rate === 0) return;

    setPurchaseData((prev) => ({
      ...prev,
      installments: [
        ...prev.installments,
        { date: new Date().toISOString().split("T")[0], rate: 0 }
      ]
    }));
  };

  React.useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between ">
        <h1 className="text-3xl">Add Purchase</h1>
        <motion.div whileTap={{ scale: 0.8 }}>
          <button
            className="bg-zinc-800 p-2 font-semibold rounded-lg border border-white/20"
            onClick={() => setShowForm()}
          >
            <RxCross2 color="white" />
          </button>
        </motion.div>
      </div>
      <Input
        name="productName"
        value={purchaseData.productName}
        onChange={handleChange}
        label="Product Name"
        type="text"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Input
          name="price"
          value={(purchaseData.price != 0 ? purchaseData.price : "")as string | number}
          onChange={handleChange}
          label="Price"
          type="number"
        />
        <Input
          name="quantity"
          value={(purchaseData.quantity != 0 ? purchaseData.quantity : "")as string | number}
          onChange={handleChange}
          label="Quantity"
          type="number"
        />
        <Input
          name="discount"
          value={(purchaseData.discount != 0 ? purchaseData.discount : "")as string | number}
          onChange={handleChange}
          label="Discount%"
          type="number"
        />
        <Input
          name="tax"
          value={(purchaseData.tax != 0 ? purchaseData.tax : "")as string | number}
          onChange={handleChange}
          label="Tax"
          type="number"
        />
      </div>

      <Input
        name="supplier"
        value={purchaseData.supplier}
        onChange={handleChange}
        label="Supplier"
        type="text"
      />
      <div className="flex gap-2 w-full">
        <Input
          name="supplierContact"
          value={purchaseData.supplierContact}
          onChange={handleChange}
          label="Supplier Contact Number"
          type="text"
          placeholder="Enter Phone Number"
          style="w-full"
        />
        <Input
          name="supplierEmail"
          value={purchaseData.supplierEmail}
          onChange={handleChange}
          label="Supplier Contact Email"
          type="text"
          placeholder="Enter Email"
          style="w-full"
        />
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <p>Supplier Address</p>
          <textarea
            className="max-h-24 min-h-24 focus:outline-none w-full pe-4 bg-zinc-800  border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
            name="supplierAddress"
            value={purchaseData.supplierAddress}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p>Shipping Address</p>
          <textarea
            className="max-h-24  min-h-24 focus:outline-none w-full pe-4 bg-zinc-800  border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
            name="shippingAddress"
            value={purchaseData.shippingAddress}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-full pe-4 bg-zinc-800  border-b border-gray-300 py-2 px-2 rounded-sm">
          <select
            name="paymentStatus"
            value={purchaseData.paymentStatus}
            onChange={handleChange}
            className="w-full"
          >
            <option value="null">Null</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="w-full pe-4 bg-zinc-800  border-b border-gray-300 py-2 px-2 rounded-sm">
          <select
            name="paymentMethod"
            value={purchaseData.paymentMethod}
            onChange={handleChange}
            className="w-full"
          >
            <option value="null">Credit</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>
      <Input
        name="orderingDate"
        value={purchaseData.orderingDate}
        onChange={handleChange}
        label="Ordering Date"
        type="date"
        style=""
      />
      <div className="flex flex-col items-end mb-4">
        <div className="w-full flex justify-between items-center">
          <p>Installments</p>
          <motion.div whileTap={{ scale: 0.8 }}>
            <button
              className="bg-zinc-800 p-2 font-semibold rounded-lg border border-white/20"
              onClick={addInstallment}
            >
              <FaPlus color="white" />
            </button>
          </motion.div>
        </div>
        {purchaseData.installments.map((inst, index) => (
          <div className="w-full my-2" key={index}>
            <Input
              value={(inst.rate != 0 ? inst.rate : "")as string | number}
              type="number"
              onChange={(e) =>
                handleInstallmentChange(index, Number(e.target.value))
              }
              label={`Installment ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <Button onPress={()=>{console.log(purchaseData)}} label="Create" />
    </div>
  );
};

export default PurchaseForm;
