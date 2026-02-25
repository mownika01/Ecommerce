import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        setShowDropdown(false);
        navigate('/login');
    };


    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLeftContainer}>
                <Link to="/" className={styles.logo}>E-Shop</Link>
            </div>

            <div className={styles.links}>
                <div className={styles.navActions}>
                    {!user ? (
                        <>
                            <Link to='/signup' className={styles.authLink}>SIGN UP</Link>
                            <Link to='/login' className={styles.authLink}>LOGIN</Link>
                        </>
                    ) : (
                        <>
                            <div 
                                className={styles.profileIcon} 
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <span className="material-icons">account_circle</span>
                                <span className={styles.userName}>{user.username?.split(' ')[0]}</span>
                            </div>

                            {showDropdown && (
                                <div className={styles.dropdown}>
                                    <Link to="/orders" onClick={() => setShowDropdown(false)}>My Orders</Link>
                                    <Link to="/profile" onClick={() => setShowDropdown(false)}>My Account</Link>
                                    <hr />
                                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                                </div>
                            )}
                        </>
                    )}

                    <Link to='/cart' className={styles.cartIconContainer}>
                        <span className="material-icons">shopping_cart</span>
                        {totalQuantity > 0 && (
                            <span className={styles.cartBadge}>{totalQuantity}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}