import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller] = useState(false)
    const [showUserLogin,setShowUserLogin] = useState(false)
    const [products,setProducts] = useState([])
    const [cartItems,setCartItems] = useState({})
    const [searchQuery,setSearchQuery] = useState({})

// Fetch Seller status
const fetchSeller = async()=>{
    try{
        const {data} = await axios.get('/api/seller/is-auth');
        if(data.success)
        {
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }

    }catch(error)
    {
        setIsSeller(false)
    }
}

// Fetch User Auth Status , User data and cart items
const fetchUser = async ()=>{
    try{
        const {data} = await axios.get('/api/user/is-auth', {
            withCredentials: true
        });
        console.log("Inside fetch",data);
        if(data.success){
            console.log(data)
            setUser(data.user)
            console.log(user)
            setCartItems(data.user.cartItems)
        }
    }catch(error){
        console.log("Inside fetch user")
        console.log(error)
        setUser(null)
    }
}


// Fetch products    
    const fetchProducts = async () =>{
        try{
            const {data} = await axios.get('/api/product/list')
            if(data.success)
            {
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
// Add items to cart
    const addToCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId])
        {
            cartData[itemId]+=1;
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

// Update cart item quantity
const updateCartItem = (itemId,quantity)=>{
let cartData = structuredClone(cartItems);
cartData[itemId] = quantity;
setCartItems(cartData);
toast.success("cart updated");
}

// Remove product from cart
const removeFromCart = (itemId) =>{
 let cartData = structuredClone(cartItems);
 if(cartData[itemId])
 {
    cartData[itemId] -= 1;
    if(cartData[itemId] === 0)
    {
        delete cartData[itemId];
    }
 }
 toast.success("Removed from cart")
 setCartItems(cartData)
}

// Get cart items count
const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems)
    {
        totalCount += cartItems[item]
    }
    return totalCount;
}    
// Get cart total amount
const getCartAmount = () =>{
    let totalAmount = 0;
    for(const items in cartItems)
    {
        let itemInfo = products.find((product)=>product._id === items);
        if(cartItems[items] > 0)
        {
            totalAmount += itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totalAmount * 100)/100;
}

useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

// Update database cart items    
    useEffect(()=>{
        const updateCart = async()=>{
            try{
                const {data} = await axios.post('/api/cart/update',{userId: user._id,cartItems})
                if(!data.success)
                {
                    toast.error(data.message)
                }
            }catch(error)
            {
                toast.error(error.message)
            }
        }
        if(user)
        {
            updateCart()
        }
    },[cartItems])
    const value = {navigate,user,setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,cartItems,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems,fetchUser}
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}
export const useAppContext = () =>{
    return useContext(AppContext);
}