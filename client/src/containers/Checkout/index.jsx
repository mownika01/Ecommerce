import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Checkout.module.css';

const Checkout = () => {
    const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);
    
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Initializing Razorpay Payment...");
    };

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.checkoutContent}>
                
                {/* Left Side: Forms */}
                <div className={styles.checkoutLeft}>
                    <form onSubmit={handleSubmit}>
                        
                        <div className={styles.checkoutSection}>
                            <h2>Shipping Details</h2>
                            <div className={styles.formGroup}>
                                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                            </div>
                            <div className={styles.formRow}>
                                <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className={styles.checkoutSection}>
                            <h2>Payment Method</h2>
                            <div className={styles.paymentBox}>
                                <div className={styles.paymentInfo}>
                                    <input type="radio" checked readOnly />
                                    <div className={styles.paymentText}>
                                        <strong>Razorpay Secure</strong>
                                        <p>UPI, Cards, Wallets, NetBanking</p>
                                    </div>
                                </div>
                                <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="RZP" className={styles.razorpayLogo} />
                            </div>
                        </div>

                        <button type="submit" className={styles.payNowBtn}>
                            Pay Now ₹{totalAmount}
                        </button>
                    </form>
                </div>

                {/* Right Side: Summary */}
                <div className={styles.checkoutRight}>
                    <div className={styles.summaryCard}>
                        <h3>Order Summary ({totalQuantity})</h3>
                        
                        <div className={styles.summaryList}>
                            {cartItems.map((item) => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <img src={item.image} alt={item.title} />
                                    <div className={styles.itemDetails}>
                                        <p className={styles.itemName}>{item.title}</p>
                                        <p className={styles.itemMeta}>Size: {item.size} | Qty: {item.quantity}</p>
                                        <p className={styles.itemPrice}>₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;