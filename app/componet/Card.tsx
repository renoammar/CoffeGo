"use client";
import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";
interface cardProps {
  name: string;
  image: string;
  description: string;
  price: number;
  id: string;
}
const imageStyle = { borderRadius: "8px" };
function Card({ name, image, price, description, id }: cardProps) {
  const router = useRouter();
  const itemsPage = () => {
    router.push(`/Items/${id}`);
  };
  return (
    <div className="bg-[#ffffff] flex flex-col justify-start items-center shadow-md w-[244px] h-[244px] rounded-md p-3">
      <div className="w-[100%] h-[100%] relative">
        <Image
          src={image}
          alt="menu image"
          fill
          objectFit="cover"
          style={imageStyle}
        />
      </div>
      <div className="h-[50%] w-full flex justify-center items-center">
        <div className="w-full">
          {" "}
          <h1 className="text-2xl font-bold">{name}</h1>
          <p>{description}</p>
          <h3 className="font-medium">IDR:{price}</h3>
        </div>

        <button
          onClick={itemsPage}
          className="bg-black text-white px-3 py-2 rounded-md mt-[35%]"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Card;
