import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';

function App() {

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
            <div className="header-links">
                <a href="cart.html">Cart</a>
                <a href="login.html">Sign In</a>
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="vegetable.html">Vegetables</a>
                    </li>
                    <li>
                        <a href="grocery.html">Grocery</a>
                    </li>
                </ul>
        </aside>
        <main className="main">
            <div className="content">
                <Route path="/cart/:id?" component={CartScreen}/>
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
