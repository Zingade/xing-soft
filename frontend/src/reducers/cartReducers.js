import { findDOMNode } from "react-dom";
import { CART_ADD_ITEM, CART_REMOVEALL_ITEM, CART_REMOVE_ITEM, CART_SEND_WAHTSAPP_MSG } from "../constants/cartConstants";

function cartReducer(state = {cartItems:[]}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=>x.product === item.product);
            
            if(product) {
                return { cartItems: 
                    state.cartItems.map(x=>x.product === product.product?item:x)};
            }
            return {cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            return {cartItems:state.cartItems.filter(x => x.product !== action.payload)}
        case CART_REMOVEALL_ITEM:
            return {cartItems:[]}
            case CART_SEND_WAHTSAPP_MSG:
            return {cartItems:state.cartItems}
        default:
        return state;
    }
}

export {cartReducer}