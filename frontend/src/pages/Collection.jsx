import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products,search,showsearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setshowFilter] = useState(false);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  const toogleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubcategory((prev) => [...prev, e.target.value]);
    }
  };

const sortProducts = () => {
  let filtercopy = filteredProducts.slice();
  switch (sortType) {
    case "Low-High":
      setFilteredProducts(
        filtercopy.sort((a, b) => {
          return a.price - b.price;
        })
      );
      break;
    case "High-Low":
      setFilteredProducts(
        filtercopy.sort((a, b) => {
          return b.price - a.price;
        })
      );
      break;
    default: applyFilter();
      break;
  }
};

const applyFilter = () => {
  let productscopy = products.slice();
  if (showsearch && search) {
    productscopy = productscopy.filter((product) =>
      product.name.toLowerCase().includes(String(search).toLowerCase())
    );
  }
  if (category.length > 0) {
    productscopy = productscopy.filter((product) =>
      category.includes(product.category)
    );
  }
  if (subcategory.length > 0) {
    productscopy = productscopy.filter((product) =>
      subcategory.includes(product.subCategory)
    );
  }
  setFilteredProducts(productscopy);
};

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showsearch, products]);

  useEffect(()=>{
    sortProducts();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/** Filter */}
      <div className="min-w-60">
        <p
          onClick={() => setshowFilter(!showFilter)}
          className="my-2 text-xl flex gap-2 items-center cursor-pointer"
        >
          Filters
        </p>
        <img
          src={assets.dropdown_icon}
          alt=""
          className={`h-3 sm:hidden ${showFilter ? "rotate-90 " : " "}`}
        />
        {/**Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toogleCategory}
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toogleCategory}
                value={"Women"}
              />
              Women
            </p>
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toogleCategory}
                value={"Kids"}
              />
              Kids
            </p>
          </div>
        </div>
        {/**Sub category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Topwear"}
              />
              Topwear
            </p>
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
            <p className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Winterwear"}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/**right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/**product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="Relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>
        {/**products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => {
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
    </div>
  );
};

export default Collection;
