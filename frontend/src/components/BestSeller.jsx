import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller= () => {
  const { products } = useContext(ShopContext);
  const [BestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    const filterProducts = products.filter((item)=> item.bestseller)
    setBestSellerProduct(filterProducts.splice(0,5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our Best Seller collection features the most-loved pieces that have
          become wardrobe staples for fashion enthusiasts. These timeless
          designs combine quality, style, and versatility, making them the go-to
          choices for any occasion.
        </p>
      </div>
      {/** rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 max-w-full md:max-w-2xl lg:max-w-7xl">
        {BestSellerProduct.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
