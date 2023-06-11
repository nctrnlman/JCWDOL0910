import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT, Icons } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="text-primary-focus grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 ">
      <Item Links={PRODUCTS} title="Layanan Pelanggan" />
      <Item Links={RESOURCES} title="Jelajahi Kami" />
      {/* <Item Links={COMPANY} title="Pembayaran" /> */}
    </div>
  );
};

export default ItemsContainer;
