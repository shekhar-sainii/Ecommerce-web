import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { currency, products, cartitems, navigate, updateQuantity } =
    useContext(ShopContext);
  const [cartdata, setCartData] = useState([]);

  console.log("cartitems:", cartitems);
  console.log("products:", products);

  useEffect(() => {

    if (products.length > 0) {
      console.log("useEffect called");
      const tempData = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item],
            });
          }
        }
      }
      console.log("tempData:", tempData);
      setCartData(tempData);
    }


  }, [cartitems, products]);

  console.log("cartdata:", cartdata);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartdata.map((item, index) => {
          const productdata = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
            >
              <div className="flex items-start gap-6">
                <img
                  src={productdata.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm-text-lg font-medium">
                    {productdata.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productdata.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                      item._id,
                      item.size,
                      Number(e.target.value)
                    )
                }
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="w-4 mr-4 cursor-pointer"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end ">
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart