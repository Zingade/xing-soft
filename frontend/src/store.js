import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productDeleteReducer, productListReducer, productSaveReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import { userCreateAdminReducer, userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';
import { orderDeleteReducer, orderListReducer, orderSaveReducer } from './reducers/orderReducers';

const cartItemsJSON = localStorage.getItem('cartItems');
const cartItems = JSON.parse(cartItemsJSON) || [];

const userInfoJSON = localStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoJSON) || [];

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
    orderList: orderListReducer,
    orderSave:orderSaveReducer,
    orderDelete:orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;