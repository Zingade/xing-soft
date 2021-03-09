import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function HomeScreen(props){
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
      const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listProducts(category));
        return() => {

        };
    }, [category]);

    const handleAddToCart = (e) => {
        e = e || window.event;
        e = e.target || e.srcElement;
        if (e.nodeName === 'BUTTON'){
  //          props.history.push("/cart/" + e.id + '?Qty=' + x);
            dispatch(addToCart(e.id,1));
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };
    const submitPlusHandler = async (e) => {
      e = e || window.event;
      e = e.target || e.srcElement;
      if (e.nodeName === 'BUTTON'){
          const inputObj = document.getElementById(e.id+'input');
          var x =  inputObj.value; 
          if (x === '5') {
            x = 5;
          }
          else{
            x++;
            await dispatch(addToCart(e.id,x));
        }
          inputObj.value = x;
          //dispatch(addToCart(e.id,x));
        }
  }

  const submitMinusHandler = async (e) => {
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON'){
    const inputObj = document.getElementById(e.id+'input');
    var x =  inputObj.value; 
    if(x === '0'){
      inputObj.value = 0;
    } else{
            if(x === '1'){
              inputObj.value = 0;
              await dispatch(removeFromCart(e.id));
            }
            else{
              --x;
              inputObj.value = x;
              await dispatch(addToCart(e.id,x));
      }
         } 
    }
}   

    return (
        <>
        {category && <h2>{category}</h2>}
  
        <ul className="filter">
          <li>
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </li>
          <li>
            Sort By{' '}
            <select name="sortOrder" onChange={sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </li>
        </ul>
        {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
    <ul className="products">
    {
        (!products.length)?
            <h3>No products available</h3>:
        //{cartItems.find(x=>x.product === product._id)
        products.map(product => 
        <li key={product._id}> 
            <div className = "product">
                <img className="product-image" src={product.image} alt="products"></img>
                <div className="product-name">{product.name}</div>
                <div className="product-name">{product.quantity}</div>
                <div className="product-price">₹{product.price}</div>
                {(cartItems.find(x=>x.product === product._id)) ? <div>
                <button className="button_plus_minus" type="button"  id={product._id} onClick={submitMinusHandler}>-</button>
                <input className="product-input" min="0" max="5" name="quantity" type="number" id={product._id+"input"} defaultValue={cartItems.find(x=>x.product === product._id).qty}></input>
                <button className="button_plus_minus" type="button" id={product._id} onClick={submitPlusHandler}>+</button>
                </div> :
                <button onClick = {handleAddToCart} className="button-add-to-cart" id={product._id} name={product._id}>Add to Cart</button>
              }
            </div>
        </li>)
    }
    </ul>
      )}
      </>
    );
}

export default HomeScreen;