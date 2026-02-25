import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart, updateQuantity } from '../../store/cartSlice';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            // If guest, send to login with redirect back to checkout
            navigate('/login?redirect=checkout');
        } else {
            // If logged in, go to address/payment
            navigate('/checkout');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Shopping Bag</h1>

            <div className={styles.cartGrid}>
                {/* Items List */}
                <div className={styles.itemsList}>
                    {cartItems.length === 0 ? (
                        <p>Your bag is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id + item.size} className={styles.cartItem}>
                                <img src={item.image} alt={item.title} className={styles.itemImg} />

                                <div className={styles.itemDetails}>
                                    <h3>{item.title}</h3>
                                    <p>Size: {item.size}</p>

                                    <div className={styles.quantityContainer}>
                                        <p className={styles.itemPrice}>₹{item.price} x </p>

                                        <div className={styles.qtySelector}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => dispatch(changeQuantity({ id: item.id, size: item.size, delta: -1 }))}
                                            >
                                                -
                                            </button>
                                            <span className={styles.qtyNumber}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => dispatch(changeQuantity({ id: item.id, size: item.size, delta: 1 }))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary Sidebar */}
                <div className={styles.summary}>
                    <h2>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{totalAmount}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Delivery</span>
                        <span className={styles.free}>FREE</span>
                    </div>
                    <hr />
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                    <button className={styles.checkoutBtn} onClick={handleCheckout} disabled={cartItems.length === 0}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;