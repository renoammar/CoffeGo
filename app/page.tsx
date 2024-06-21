"use client";
import { useState, useEffect } from "react";
import Card from "./componet/Card";
import { FaSearch } from "react-icons/fa";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchMenuItems = async () => {
    const response = await fetch("/api/menuItemsByCategory");
    const items: MenuItem[] = await response.json();
    setMenuItems(items);
  };

  const fetchFilteredItems = async () => {
    const response = await fetch(
      `/api/menuItemsByCategory?search=${search}&category=${category}`
    );
    const items: MenuItem[] = await response.json();
    setMenuItems(items);
  };

  useEffect(() => {
    if (search || category) {
      fetchFilteredItems();
    } else {
      fetchMenuItems();
    }
  }, [search, category]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const renderedMenuItems = menuItems.map((item) => (
    <Card
      key={item.id}
      description={item.description}
      name={item.name}
      image={item.image}
      price={item.price}
      id={item.id}
    />
  ));

  return (
    <main className="h-screen bg-[#f6f4f3] w-full flex flex-col justify-center items-center">
      <div className="w-[80%] mb-4 flex gap-4">
        <button
          onClick={() => handleCategoryChange("")}
          className="p-2 bg-[#bebdbd] focus:opacity-50 rounded"
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange("coffee")}
          className="p-2 bg-[#bebdbd] focus:opacity-50 rounded"
        >
          Coffee
        </button>
        <button
          onClick={() => handleCategoryChange("Non-Coffee Beverage")}
          className="p-2 bg-[#bebdbd] focus:opacity-50 rounded"
        >
          Non-Coffee Beverage
        </button>
        {/* <button
          onClick={() => handleCategoryChange("food")}
          className="p-2 bg-[#bebdbd] focus:opacity-50 rounded"
        >
          Food
        </button> */}
      </div>
      <div className="w-[80%] mb-4">
        <div className="w-full h-[20%] relative">
          <div className="relative w-full">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search coffee"
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div className="p-6 overflow-y-auto border-slate-300 bg-[#ffffff] border h-[80%] w-[80%] flex justify-center items-center gap-12 flex-wrap">
        {renderedMenuItems}
      </div>
    </main>
  );
}
