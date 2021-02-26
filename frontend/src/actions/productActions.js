import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constants/productConstants"

const listProducts = () => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await Axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data});
        }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload:error.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SAVE_REQUEST, payload:product});
        const {userSignin: {userInfo}} = getState();
        console.log(userInfo);
        const {data} = await Axios.post('/api/products', product, {
            headers: {Autorization: 'Bearer ' + userInfo.token,} 
        });
        dispatch({type:PRODUCT_SAVE_SUCCESS, payload:data});
    }
    catch(error){
        dispatch({type: PRODUCT_SAVE_FAIL, payload:error.message});
    }
} 

export {listProducts,saveProduct}; 