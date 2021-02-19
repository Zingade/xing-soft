import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/CartActions';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.seach?Number(props.location.seach.split("=")[1]):1;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[]);

    return <div>Cart Screen</div>
}

export default CartScreen;