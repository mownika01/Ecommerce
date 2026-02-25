import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../../store/authSlice';
import styles from './register.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(registerUser({
      name: formData.username,
      email: formData.email,
      password: formData.password
    })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        alert("Registration successful! Redirecting to login...");
        navigate('/');
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            className={styles.input} 
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className={styles.input} 
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className={styles.input} 
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            className={styles.input} 
            onChange={handleChange}
            required
          />
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>
        
        <Link to="/login" className={styles.link}>
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;