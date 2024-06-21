import { Prisma } from "@prisma/client";

export type MenuItemType = Prisma.MenuItemGetPayload<{}>;

export interface CartItemType {
  id: string;
  menuItem: MenuItemType;
  menuItemId: string;
  cartId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartType {
  id: string;
  items: CartItemType[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// If you need to include relations, you can use Prisma's built-in type helpers
export type FullCartType = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        menuItem: true;
      };
    };
  };
}>;
