import axios from "axios"
import Cookie from "js-cookie"

import { CART_SEND_WAHTSAPP_MSG, CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try{
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload:{
            product: data._id,
            name: data.name,
            image:data.image,
            price:data.price,
            quantity:data.quantity,
            qty
        }})

        const {cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch(error){

    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    try{
        dispatch({type:CART_REMOVE_ITEM, payload:productId})

        const {cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch(error){

    }
} 

const sendWhatsAppMessage = () => async (dispatch,getState) => {
    try{

        var messageTobeSend = "";
        const {cart: {cartItems}} = getState();
        cartItems.map( item => messageTobeSend += (item.name + " " + item.quantity + 'x' + item.qty +' quantity'  + "$$"))  
        const {data} = await axios.post("/api/products/sendwhatsapp/" + messageTobeSend);
        dispatch({type:CART_SEND_WAHTSAPP_MSG})
        }
    catch(error){

    }
}

export {addToCart, removeFromCart,sendWhatsAppMessage};