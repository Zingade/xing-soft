import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, sendWhatsAppMessage } from '../actions/cartActions';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;


    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));

    }

    const checkOutHandler = () => {
        if (cartItems.length) {
            dispatch(sendWhatsAppMessage());
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
                SubTotal ({cartItems.reduce((a,c) => a + 1 * c.qty, 0)} items)
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
