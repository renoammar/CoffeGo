"use client";
import React from "react";
import { deleteCartItem } from "../action";
import Image from "next/image";
import { FullCartType } from "../action/type";
import { MdDeleteOutline } from "react-icons/md";
interface CartItemsProps {
  cart: FullCartType;
  deleteAll: () => Promise<void>;
}

const CartItems: React.FC<CartItemsProps> = ({ cart, deleteAll }) => {
  const handleDeleteItems = async (id: string) => {
    await deleteCartItem(id);
    // Optionally, you might want to refresh or update the UI here
  };

  return (
    <div className="w-[30%] bg-[#ffffff] border-slate-300 border h-screen flex justify-start font-serif py-2 flex-col  items-center">
      <h1 className="text-4xl font-bold">Cart Items</h1>
      <div className="overflow-y-auto h-[80%] border-slate-300 border w-[95%] flex justify-center items-center flex-col gap-9">
        {!cart || cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center  bg-white w-[80%] h-[15%] shadow-md"
            >
              <div className="relative h-[100%] w-[30%] ">
                <Image alt="menu image" src={item.menuItem.image} fill />
              </div>
              <div className="w-[70%] px-2 flex justify-between items-center flex-wrap">
                <div className="flex flex-col justify-center items-start">
                  <h1>{item.menuItem.name}</h1>
                  <h2>IDR: {item.menuItem.price}</h2>
                  <h4>Quantity:{item.quantity}</h4>
                </div>

                <button
                  className="bg-[#bebdbd] p-2 rounded-full"
                  type="button"
                  onClick={() => handleDeleteItems(item.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="grow flex justify-between items-center flex-col  w-full">
        <div className="grow flex justify-center items-center">
          <h1>Total Price {cart.totalPrice}</h1>
        </div>

        <form action={deleteAll} className="w-full h-[50%]">
          <button
            type="submit"
            className="w-full h-full font-sans text-1xl bg-black text-white"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartItems;
