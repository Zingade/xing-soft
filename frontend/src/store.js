import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productDeleteReducer, productListReducer, productSaveReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import Cookie from "js-cookie"
import { userCreateAdminReducer, userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

const cartITemsJSON = localStorage.getItem('cartItems');
const cartItems = JSON.parse(cartITemsJSON) || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: {cartItems}, userSignin: {userInfo} };
const reducer = combineReducers({
    productList: productListReducer,
    cart: cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    userCreateAdmin:userCreateAdminReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userUpdate: userUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;