"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export const addToCart = async (menuItemId: string, quantity: number) => {
  const menuItem = await db.menuItem.findUnique({
    where: { id: menuItemId },
  });

  if (!menuItem) {
    throw new Error("Invalid menu item");
  }

  const cart = await db.cart.findFirst(); // Assuming you have a single cart for simplicity

  if (!cart) {
    throw new Error("Cart not found");
  }

  const existingCartItem = await db.cartItem.findFirst({
    where: {
      cartId: cart.id,
      menuItemId: menuItem.id,
    },
  });

  if (existingCartItem) {
    await db.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
    });
  } else {
    await db.cartItem.create({
      data: {
        menuItemId: menuItem.id,
        cartId: cart.id,
        quantity,
      },
    });
  }

  const updatedCartItems = await db.cartItem.findMany({
    where: { cartId: cart.id },
    include: { menuItem: true },
  });

  const totalPrice = updatedCartItems.reduce((total, item) => {
    return total + item.quantity * item.menuItem.price;
  }, 0);

  await db.cart.update({
    where: { id: cart.id },
    data: { totalPrice },
  });
  revalidatePath("/", "page");
};

export async function getCart() {
  let cart = await db.cart.findFirst({
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        totalPrice: 0,
        items: {
          create: [], // Initialize items with an empty array
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  return cart;
}

export const deleteCartItem = async (cartItemId: string) => {
  const cartItem = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { menuItem: true },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await db.cartItem.delete({
    where: { id: cartItemId },
  });

  const cart = await db.cart.findUnique({
    where: { id: cartItem.cartId },
    include: { items: { include: { menuItem: true } } },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * item.menuItem.price;
  }, 0);

  await db.cart.update({
    where: { id: cart.id },
    data: { totalPrice },
  });
  revalidatePath("/", "page");
};

export const clearCart = async () => {
  const cart = await db.cart.findFirst();

  if (!cart) {
    throw new Error("Cart not found");
  }

  await db.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  await db.cart.update({
    where: { id: cart.id },
    data: { totalPrice: 0 },
  });
  revalidatePath("/", "page");
};
export const filteredItems = async (search: string) => {
  const items = await db.menuItem.findMany({
    where: {
      OR: [
        { category: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ],
    },
  });
  return items;
};
