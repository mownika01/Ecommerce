import React from 'react';
import styles from './Hero.module.css';
import heroImg from '../../assets/girl1.jpg'; // Path to your image

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.textContent}>
        <span className={styles.subTitle}>Best Deal Online on Smart Watches</span>
        <h1 className={styles.mainTitle}>
          SMART WEARABLE. <br />
          <span className={styles.highlight}>UP TO 80% OFF</span>
        </h1>
        <button className={styles.shopBtn}>Shop Now</button>
      </div>

      <div className={styles.imageContent}>
        <div className={styles.circleDecor}></div>
        <img src={heroImg} alt="Hero" className={styles.heroImage} />
      </div>
    </div>
  );
};

export default HeroSection;