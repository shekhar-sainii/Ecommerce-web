import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import PropTypes from "prop-types";
import Title from "./Title";
import ProductItem from "./ProductItem";

export const RelatedProducts = ({category,subcategory}) => {
    const {products} = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let productcopy = products.slice();
            productcopy = productcopy.filter((item)=>category === item.category);
            productcopy = productcopy.filter((item)=>subcategory===item.subcategory);
            setRelated(productcopy.slice(0,5));
        }
    },[products])

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 max-w-full md:max-w-2xl lg:max-w-7xl">
        {related.map((item, index) => {
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
}
RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
};
