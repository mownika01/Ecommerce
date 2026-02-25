import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
import Products from '../containers/Products';
// import ProductDetail from './pages/ProductDetail';
import Cart from '../containers/Cart';
import Signup from '../containers/Register';
import Login from '../containers/Login';
import Home from '../containers/Home';
import Checkout from '../containers/Checkout';

function App() {
    const location = useLocation();

  const hideNavbar = location.pathname === '/signup' || location.pathname === '/login';
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;