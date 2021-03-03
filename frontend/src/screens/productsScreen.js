import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';
import axios from "axios";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [qty_measured_in, setQtyMeasuredIn] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state=>state.productList);
    const {loading, products, error} = productList;
    const productSave = useSelector(state=>state.productSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = productSave;
    const productDelete = useSelector(state=>state.productDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = productDelete;
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () =>{
        };
    }, [successSave,successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setQtyMeasuredIn(product.qty_measured_in);
        setDescription(product.description);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id, name,price, image, category, qty_measured_in,description}));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
    };
    
    return  <div className="containt containt-margined"> 
    <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick ={()=>openModal({})}>Create Product</button>
    </div>
    {modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {loadingSave&&<div>Loading...</div>}
                    {errorSave&&<div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name"> 
                    Name:
                    </label>
                    <input type="text" value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="price"> 
                    Price:
                    </label>
                    <input type="text" value={price} name="price" id="price" onChange={(e)=>setPrice(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="image">Image</label>
                    <input
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <div>Uploading...</div>}
                </li>
                <li>
                    <label htmlFor="category"> 
                    Category:
                    </label>
                    <input type="text" value={category} name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="quantity-in"> 
                    Qty Measured In:
                    </label>
                    <input type="text" value={qty_measured_in} name="quantity-in" id="quantity-in" onChange={(e)=>setQtyMeasuredIn(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="name"> 
                    Description:
                    </label>
                    <textarea type="text" value={description} name="description" id="description" onChange={(e)=>setDescription(e.target.value)}> </textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"Update":"Create"}</button>
                </li>
                <li>
                    <button type="submit" onClick = {()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>
    }
    <div className="product-list">
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity Measured In</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.qty_measured_in}</td>
                <td>
                  <button onClick={()=>openModal(product)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(product)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default ProductsScreen;