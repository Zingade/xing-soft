import axios from "axios"

import { CART_SEND_WAHTSAPP_MSG, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_REMOVEALL_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try{
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload:{
            product: data._id,
            name: data.name,
            image:data.image,
            price:data.price,
            quantity:data.quantity,
            category:data.category,
            qty
        }})

        const {cart: {cartItems}} = getState();
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
    }
    catch(error){

    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    try{
        dispatch({type:CART_REMOVE_ITEM, payload:productId})

        const {cart: {cartItems}} = getState();
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
    }
    catch(error){

    }
} 

const removeAllCartContents = () => async (dispatch,getState) => {
    try{
        dispatch({type:CART_REMOVEALL_ITEM})

        localStorage.removeItem('cartItems');
        const {cart: {cartItems}} = getState();
    }
    catch(error){

    }
}

const sendWhatsAppMessage = () => async (dispatch,getState) => {
    try{
        var messageTobeSend="", vegetablesString = "$$Vegetables:$$", groceryString="$$Grocery:$$", medicineString="$$Medicine:$$",stationnaryString="$$Stationary:$$",othersString="$$Others:$$";
        const {cart: {cartItems}} = getState();
        cartItems.map( item => 
            (item.category === "Vegetables")?(vegetablesString += ((item.qty === 1)?(item.name + " " + item.quantity +"$$"):(item.name + " " + item.quantity + ' x ' + item.qty +' quantity'  + "$$"))):
            (item.category === "Grocery")?(groceryString += ((item.qty === 1)?(item.name + " " + item.quantity +"$$"):(item.name + " " + item.quantity + ' x ' + item.qty +' quantity'  + "$$"))):
            (item.category === "Medicine")?(medicineString += (item.name + " " + item.quantity +"$$")):  
            (item.category === "Stationary")?(stationnaryString += (item.name + " " + item.quantity +"$$")):
            (othersString +=  (item.name + " " + item.quantity +"$$")));
            messageTobeSend += (
                ((vegetablesString === "$$Vegetables:$$")?"":vegetablesString)+
                ((groceryString === "$$Grocery:$$")?"":groceryString)+
                ((medicineString === "$$Medicine:$$")?"":medicineString)+
                ((stationnaryString === "$$Stationary:$$")?"":stationnaryString)+
                ((othersString === "$$Others:$$")?"":stationnaryString));
        const {data} = await axios.post("/api/products/sendwhatsapp/" + messageTobeSend);
        localStorage.setItem("cartItemsString",messageTobeSend);
        dispatch({type:CART_SEND_WAHTSAPP_MSG})
        }
    catch(error){

    }
}

export {addToCart, removeFromCart,sendWhatsAppMessage,removeAllCartContents};