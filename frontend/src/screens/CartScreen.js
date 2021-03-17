import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, sendWhatsAppMessage, listCarts } from '../actions/cartActions';
import { saveOrder } from '../actions/orderActions';

function CartScreen(props) {

    const cartList = useSelector(state => state.cartList);
    const {cartItems, loading, error} = cartList;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();

    const removeFromCartHandler = async (productId) => {
        await dispatch(removeFromCart(productId));
        await dispatch(listCarts());
    }

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
     }
     
    const checkOutHandler = async () => {
        var cartListString ='';
        if (!userInfo){
            props.history.push("/signin?redirect=cart");
        }
        else
        {
            if (cartItems.length) {
                await dispatch(sendWhatsAppMessage());
                const cartItemsString = await localStorage.getItem("cartItemsString");
                const newString = replaceAll(cartItemsString,"$$","\n");  
                await props.history.push("/signin?redirect=/");
                const order = {orderUserName:userInfo.name,orderDate:new Date(),noOfItems:cartItems.length, aproxPrice:cartItems.reduce((a,c) => a + c.price * c.noOfItems, 0), cartItemsString:newString,}
                await dispatch(saveOrder(order));
                //await dispatch(removeAllCartContents());
                localStorage.removeItem('cartItemsString');
                props.history.push("/");
                //props.history.push("/signin?redirect=orders");
            }
        }
    }

    const deleteAllCart = async ()=>{
        await dispatch(removeFromCart(-1));
        await dispatch(listCarts());
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
            dispatch(listCarts());
        }
    },[])

    
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                {loading?<div>loading....</div>:
                (error)?error.message:(
                    <div>
                    <li>
                        <h3>
                            Shopping Cart
                        </h3>
                        <div>
                            Price
                        </div> 
                        <div>
                            <button className="button primary" onClick ={()=>deleteAllCart()} disabled = {cartItems.length === 0}>Delete All</button>
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ? 
                        <div>
                            Cart is empty;
                        </div>
                        : 
                        cartItems.map( item => 
                        <li key={item.product}>
                            <div className="cart-image">
                                <img src={item.image} alt="product"></img>
                            </div>
                            <div className="cart-name">
                                <div>
                                    {item.name};
                                </div>
                                {item.quantity} x {item.noOfItems} quantity     . 
                                <button type="button" className="button primary button_right" onClick={()=>removeFromCartHandler(item.product)}>
                                    Delete
                                </button>
                            </div>
                            <div className="cart-price">
                                ₹{item.price}
                            </div>
                        </li>
                        )
                    }
                    </div>
                    )}
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Estimated Total ({cartItems.reduce((a,c) => a + 1 * c.noOfItems, 0)} items)
                :
                ₹{cartItems.reduce((a,c) => a + c.price * c.noOfItems, 0)}
            </h3>
            <button onClick = {checkOutHandler} className="button primary full-width" disabled = {cartItems.length === 0}>
                Checkout and send WhatsApp
            </button>
        </div>
    </div>;
}

export default CartScreen;
