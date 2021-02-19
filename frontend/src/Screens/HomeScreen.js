import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props){
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listProducts());
        return() => {

        };
    }, []);

    const handleAddToCart = (e) => {
        e = e || window.event;
        e = e.target || e.srcElement;
        if (e.nodeName === 'BUTTON'){
            var x =  document.getElementById(e.id+'1').value; 
            props.history.push("/cart/" + e.id + '?Qty=' + x);
        }
    }

    return loading?<div>loading....</div> :
    error? <div>(error)</div> :
    <ul className="products">
    {
        products.map(product => 
        <li key={product._id}> 
            <div className="product">
                <img className="product-image" src={product.image} alt="products"></img>
                <div className="product-name">{product.name}</div>
                <div className="product-qty"> Qty: <select id={product._id+'1'}>
                    <option className="product-qty">0.5</option>
                    <option className="product-qty">1</option>
                    <option className="product-qty">2</option>
                    <option className="product-qty">3</option>
                    <option className="product-qty">4</option>
                    <option className="product-qty">5</option>
                    </select> {product.qty_measured_in}
                </div>
                <div className="product-price">₹{product.price}</div>
                <button onClick = {handleAddToCart} className="button-add-to-cart" id={product._id} name={product._id}>Add to Cart</button>
            </div>
        </li>)
    }
</ul>;
}

export default HomeScreen;