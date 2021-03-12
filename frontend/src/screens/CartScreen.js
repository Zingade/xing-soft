import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, sendWhatsAppMessage, removeAllCartContents } from '../actions/cartActions';
import { saveOrder } from '../actions/orderActions';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 


    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));

    }

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
     }
     
    const checkOutHandler = async () => {
        var cartListString ='';
        if (cartItems.length) {
            await dispatch(sendWhatsAppMessage());
            const cartItemsString = await localStorage.getItem("cartItemsString");
            const newString = replaceAll(cartItemsString,"$$","\n");  
            const order = {orderUserName:userInfo.name,orderDate:new Date(),noOfItems:cartItems.length, aproxPrice:cartItems.reduce((a,c) => a + c.price * c.qty, 0), cartItemsString:newString,}
            await dispatch(saveOrder(order));
            await dispatch(removeAllCartContents());
            localStorage.removeItem('cartItemsString'); 
            props.history.push("/signin?redirect=orders");
        }
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[])

    
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
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
                            {item.quantity} x {item.qty} quantity     . 
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
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Estimated Total ({cartItems.reduce((a,c) => a + 1 * c.qty, 0)} items)
                :
                ₹{cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick = {checkOutHandler} className="button primary full-width" disabled = {cartItems.length === 0}>
                Checkout and send WhatsApp
            </button>
        </div>
    </div>;
}

export default CartScreen;
