"use server";
import { db } from "@/app/db";
import CurrentItems from "@/app/componet/CurrentItems";
interface ItemProps {
  params: {
    id: string;
  };
}

async function ItemsPage({ params }: ItemProps) {
  const id = params.id;

  const currentItems = await db.menuItem.findFirst({
    where: {
      id,
    },
  });

  if (!currentItems) {
    return <div>Item not found</div>;
  }

  return (
    <CurrentItems
      image={currentItems.image}
      price={currentItems.price}
      name={currentItems.name}
      description={currentItems.description}
      category={currentItems.category}
      menuItemsId={params.id}
    />
  );
}

export default ItemsPage;
