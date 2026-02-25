import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import styles from './Product.module.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <div className={styles.loading}>Loading Collection...</div>;
  if (status === 'failed') return <div className={styles.error}>{error}</div>;

  const productData = items?.data || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>All Products</h2>
      </div>

      <div className={styles.grid}>
        {productData.map((product) => (
          <Link
            to={`/products/${product._id}`} 
            className={styles.productLink} 
            key={product._id}
          >
          <div className={styles.productCard}>
            <div className={styles.imageBox}>
              <img src={product.images[0]} alt={product.title} className={styles.mainImg} />
            </div>

            <div className={styles.details}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.price}>₹{product.basePrice}</p>
              
              <div className={styles.ratingRow}>
                <span className={styles.star}>★</span>
                <span className={styles.ratingScore}>4.8</span>
                <span className={styles.divider}>|</span>
                <span className={styles.soldCount}>1.2k Sold</span>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;