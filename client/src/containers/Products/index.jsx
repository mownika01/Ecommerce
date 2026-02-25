import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../../store/productSlice';
import styles from './Products.module.css';
import { addItemToCart } from '../../store/cartSlice';

const Products = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, status, error } = useSelector((state) => state.products);
    const [selectedSize, setSelectedSize] = useState("");

const handleAddToBag = () => {
    if (!selectedSize) {
        alert("Please select a size");
        return;
    }

    const itemData = {
        id: selectedProduct._id,
        title: selectedProduct.title,
        price: selectedProduct.basePrice,
        image: selectedProduct.images[0],
        size: selectedSize
    };
    dispatch(addItemToCart(itemData));
};

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        return () => dispatch(clearSelectedProduct());
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedProduct?.variants?.[0]?.size?.length > 0) {
            setSelectedSize(selectedProduct.variants[0].size[0]);
        }
    }, [selectedProduct]);

    if (status === 'loading') return <div className={styles.loading}>Loading Product...</div>;
    if (status === 'failed') return <div className={styles.error}>{error}</div>;
    if (!selectedProduct) return null;

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link to='/'>Home</Link> / Fashion / {selectedProduct.title}
            </div>

            <div className={styles.mainGrid}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.thumbnails}>
                        {selectedProduct.images.map((img, idx) => (
                            <img key={idx} src={img} alt="thumb" className={styles.thumb} />
                        ))}
                    </div>
                    <div className={styles.mainImageWrapper}>
                        <img src={selectedProduct.images[0]} alt={selectedProduct.title} className={styles.mainImg} />
                    </div>
                </div>

                {/* Product Info */}
                <div className={styles.info}>
                    <p className={styles.brand}>MEGAMART PREMIUM</p>
                    <h1 className={styles.title}>{selectedProduct.title}</h1>
                    
                    <div className={styles.priceRow}>
                        <h2 className={styles.price}>₹{selectedProduct.basePrice}</h2>
                        <div className={styles.rating}>
                            <span className={styles.star}>★</span> 4.8 | <span>1.2k Sold</span>
                        </div>
                    </div>

                    <div className={styles.descriptionSection}>
                        <h3>Description</h3>
                        <p>{selectedProduct.description}</p>
                    </div>

                    {/* Dynamic Size Selector */}
                    <div className={styles.sizeSection}>
                        <p className={styles.sectionLabel}>Select Size: <strong>{selectedSize}</strong></p>
                        <div className={styles.sizeGrid}>
                            {selectedProduct.variants?.[0]?.size.map((size) => (
                                <button 
                                    key={size} 
                                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.cartBtn} onClick={handleAddToBag}>ADD TO BAG</button>
                        <button className={styles.buyBtn}>BUY IT NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;