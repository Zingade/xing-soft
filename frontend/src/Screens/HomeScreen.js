import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreen(props){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
            const fetchData = async () => {
                const {data} = await axios.get('/api/products');
                setProducts(data);
            }
            fetchData();
        return() => {

        };
    }, []);
    console.log(products);
    
    return <ul className="products">
    {
        products.map(product => 
        <li key={product._id}> 
            <div className="product">
                <img className="product-image" src={product.image} alt="products"></img>
                <div className="product-name">{product.name}</div>
                <div className="product-qty">Qty: <select className="product-qty">
                    <option className="product-qty">0.5</option>
                    <option className="product-qty">1</option>
                    <option className="product-qty">2</option>
                    <option className="product-qty">3</option>
                    <option className="product-qty">4</option>
                    <option className="product-qty">5</option>
                    </select> {product.qty_measured_in}
                </div>
                <div className="product-price">₹{product.price}</div>
                <button className="button-add-to-cart">Add to Cart</button>
            </div>
        </li>)
    }
</ul>;
}

export default HomeScreen;