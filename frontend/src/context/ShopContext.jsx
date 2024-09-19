import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // const backendUrl = 'http://localhost:5000';

    const [search, setSearch] = useState([]);
    const [showsearch, setShowsearch] = useState(false);
    const [cartitems, setCartItems] = useState({});
    const [products, setProduct] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Poduct Size');
        }

        let cartData = structuredClone(cartitems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.msg)

            }
        }
    }

    const getCartCount = () => {
        let totalcount = 0;
        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalcount += cartitems[items][item];
                    }
                }
                catch (error) {
                    console.log(error);

                }
            }
        }
        return totalcount;
    }



    const updateQuantity = async (itemId, size, quantity) => {
        let cartdata = structuredClone(cartitems);
        cartdata[itemId][size] = quantity;
        setCartItems(cartdata);


        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.msg)

            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartitems) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalAmount += iteminfo.price * cartitems[items][item];
                    }
                }
                catch (error) {
                    console.log(error);

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProduct(response.data.products)
            } else {
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.msg)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.get(backendUrl + '/api/product/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.msg)

        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token'))
            setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }, [])




    useEffect(() => {

    }, [cartitems])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showsearch,
        setShowsearch,
        cartitems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;