import axios from "axios";
import { createContext, useEffect, useState } from "react";

// import { food_list } from "../Assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cartItem");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  
  const url = "http://localhost:4000";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [food_list,setFoodList] =useState([])

  const addToCart =async (itemId) => {
    setCartItem((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      };
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      
    }
  };

  const removeFromCart = async (itemId) => {
    let updatedCart;
  
    setCartItem((prev) => {
      if (prev[itemId] > 1) {
        updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        updatedCart = rest;
      }
  
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });
  
    // Make the API call after updating the state
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
        // Optional: Handle the error, maybe revert the state if needed
      }
    }
  };
  

  const getTotalCartAmount = () => {
    return Object.entries(cartItem).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * quantity : total;
    }, 0);
  };


 

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }
  const loadcartData =async(token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItem(response.data.cartData)

  }

  useEffect(() => {
    // if(localStorage.getItem("token")){
    //   setToken((localStorage.getItem("token")))
    // }
    async function loadData(){
      await fetchFoodList()
       if(localStorage.getItem("token")){
      setToken((localStorage.getItem("token")))
      await loadcartData(localStorage.getItem("token"))
    }
    }
    loadData()
      },[])



  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;


