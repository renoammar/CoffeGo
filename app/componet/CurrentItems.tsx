"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";
import { addToCart } from "../action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
interface ItemsProps {
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
  menuItemsId: string;
}
function CurrentItems({
  image,
  name,
  price,
  description,
  category,
  menuItemsId,
}: ItemsProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        await addToCart(menuItemsId, quantity);
        alert("Item added to cart!");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
      router.push("/");
    } else {
      alert("Quantity must be greater than zero.");
    }
  };
  return (
    <div className="h-screen w-full bg-[#f6f4f3] flex justify-center items-center">
      {" "}
      <div className="relative h-[90%]  w-[40%]">
        <Image alt="menu items" src={image} fill />
      </div>
      <div className="w-[50%] h-[90%]  shadow-md bg bg-white flex justify-between items-start flex-col p-8">
        <div className="h-[60%] w-full  flex justify-around flex-col">
          <h1 className="text-7xl font-bold">{name}</h1>
          <h3 className="font-serif text-4xl">PRICE IDR:{price}</h3>
          <p className="">{description}</p>
          <div className="bg-[#f6f4f3] text-center  rounded px-2 py-1 text-black">
            {category}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            className="border-black border-2 text-black hover:bg-black  hover:text-white p-5 rounded-md"
            onClick={() => {
              setQuantity((prev) => {
                return prev + 1;
              });
            }}
          >
            <FaPlus />
          </button>
          <div className="mx-4 text-2xl">{quantity}</div>
          <button
            className="border-black border-2 text-black hover:bg-black  hover:text-white p-5 rounded-md"
            onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
          >
            <FaMinus />
          </button>
          <button
            onClick={() => {
              setQuantity(0);
            }}
            className="border-black border-2 text-black hover:bg-black  hover:text-white p-5 rounded-md"
          >
            REMOVE
          </button>
        </div>
        <div className="w-full">
          {" "}
          <Link href={"/"} className="border border-black p-2 w-[30%]">
            Back to menu
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-[30%] py-2 bg-black text-white ml-4"
          >
            add to carts
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentItems;
