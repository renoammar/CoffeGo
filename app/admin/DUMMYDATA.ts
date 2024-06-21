import { db } from "../db";
export const dummyData = [
  {
    name: "Espresso",
    description: "A strong and bold coffee shot",
    price: 35000, // in Indonesian Rupiah
    category: "coffee",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771693/DALL_E_2024-06-07_21.47.36_-_A_simple_minimalistic_coffee_cup_with_a_brown_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_yje9b8.webp",
  },
  {
    name: "Latte",
    description: "Smooth and creamy coffee with milk",
    price: 50000,
    category: "coffee",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771693/DALL_E_2024-06-07_21.47.36_-_A_simple_minimalistic_coffee_cup_with_a_brown_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_yje9b8.webp",
  },
  {
    name: "Cappuccino",
    description: "Rich coffee with a thick layer of foam",
    price: 45000,
    category: "coffee",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771693/DALL_E_2024-06-07_21.47.36_-_A_simple_minimalistic_coffee_cup_with_a_brown_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_yje9b8.webp",
  },
  {
    name: "Americano",
    description: "Espresso diluted with hot water",
    price: 30000,
    category: "coffee",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771693/DALL_E_2024-06-07_21.47.36_-_A_simple_minimalistic_coffee_cup_with_a_brown_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_yje9b8.webp",
  },
  {
    name: "Mocha",
    description: "A blend of coffee, chocolate, and milk",
    price: 60000,
    category: "coffee",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771693/DALL_E_2024-06-07_21.47.36_-_A_simple_minimalistic_coffee_cup_with_a_brown_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_yje9b8.webp",
  },
  {
    name: "Matcha Latte",
    description: "Green tea with steamed milk",
    price: 60000,
    category: "Non-Coffee Beverage",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771877/DALL_E_2024-06-07_21.51.03_-_A_simple_minimalistic_black_coffee_cup_with_a_black_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_jabf6e.webp",
  },
  {
    name: "Chai Latte",
    description: "Spiced tea with steamed milk",
    price: 55000,
    category: "Non-Coffee Beverage",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771877/DALL_E_2024-06-07_21.51.03_-_A_simple_minimalistic_black_coffee_cup_with_a_black_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_jabf6e.webp",
  },
  {
    name: "Hot Chocolate",
    description: "Rich and creamy chocolate drink",
    price: 50000,
    category: "Non-Coffee Beverage",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771877/DALL_E_2024-06-07_21.51.03_-_A_simple_minimalistic_black_coffee_cup_with_a_black_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_jabf6e.webp",
  },
  {
    name: "Iced Tea",
    description: "Chilled tea served with ice",
    price: 35000,
    category: "Non-Coffee Beverage",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771877/DALL_E_2024-06-07_21.51.03_-_A_simple_minimalistic_black_coffee_cup_with_a_black_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_jabf6e.webp",
  },
  {
    name: "Lemonade",
    description: "Refreshing lemon drink",
    price: 40000,
    category: "Non-Coffee Beverage",
    image:
      "https://res.cloudinary.com/dafygituy/image/upload/v1717771877/DALL_E_2024-06-07_21.51.03_-_A_simple_minimalistic_black_coffee_cup_with_a_black_paper_sleeve_and_a_white_lid_placed_against_a_plain_light_grey_background_jabf6e.webp",
  },
];
export async function createDB() {
  await db.menuItem.createMany({
    data: dummyData,
  });
}
