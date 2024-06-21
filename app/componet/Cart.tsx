"use server";
import React from "react";
import { clearCart, getCart } from "../action";
import CartItems from "./CartItems";

async function Cart() {
  const cart = await getCart();
  const deleteAll = clearCart.bind(null);

  return <CartItems cart={cart} deleteAll={deleteAll} />;
}

export default Cart;
