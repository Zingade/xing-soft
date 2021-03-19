import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import SignInScreen from './screens/SignInScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import CreateAdminScreen from './screens/createAdminScreen';
import ProductsScreen from './screens/productsScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 

    const cartList = useSelector(state => state.cartList);
    const {cartItems, loading, error} = cartList;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    } 
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }
    

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick= {openMenu}>
                    &#9776;
                </button>
                <Link className="brand" to="/">xingShop</Link>
            </div>
            {loading?<div> </div>:
            (error)?error.message:(
            <div className="header-links">
            <Link to='/cart' >Cart[{cartItems.length}]</Link>
            {
                userInfo  ? <Link to='/profile'>{userInfo.name}</Link>:
                <Link to='/signin'>Sign In</Link>
            }
          {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <a href="#">Admin</a>
            <ul className="dropdown-content">
              <li>
                <Link to="/orders">Orders</Link>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
        )}
        </div>
         )}
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul className="categories">
                    <li>
                        <Link to="/category/Vegetables" onClick={closeMenu}>Vegetables</Link>
                    </li>
                    <li>
                        <Link to="/category/FreshFruits" onClick={closeMenu}>Fresh Fruits</Link>
                    </li>
                    <li>
                        <Link to="/category/Grocery" onClick={closeMenu}>Grocery</Link>
                    </li>
                    <li>
                        <Link to="/category/Medicine" onClick={closeMenu}>Medicine</Link>
                    </li>
                    <li>
                        <Link to="/category/Stationary" onClick={closeMenu}>Stationary</Link>
                    </li>
                    <li>
                        <Link to="/category/KidsZone" onClick={closeMenu}>KidsZone</Link>
                    </li>
                    <li>
                        <Link to="/category/Others" onClick={closeMenu}>Others</Link>
                    </li>
                </ul>
        </aside>
        <main className="main">
            <div className="content">
                <Route path="/orders" component={OrdersScreen}/>
                <Route path="/profile" component={ProfileScreen}/>
                <Route path="/products" component={ProductsScreen}/>
                <Route path="/createadmin" component={CreateAdminScreen}/>
                <Route path="/register" component={RegisterScreen}/>
                <Route path="/signin" component={SignInScreen}/>
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route path="/category/:id" component={HomeScreen} />
                <Route path="/" exact={true} component={HomeScreen}/>
            </div>
        </main>
        <footer className="footer">
        xingSoft - Alright reserved.
        </footer>
    </div>
    </BrowserRouter>
);
}

export default App;
