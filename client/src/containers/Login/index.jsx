import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser, clearError } from '../../store/authSlice';
import styles from './Login.module.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { status, error } = useSelector((state) => state.auth);

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') === 'checkout' ? '/cart' : '/';

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(redirectPath);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SIGN IN</h1>
        
        {error && <div className={styles.errorMsg}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <button 
            type="submit" 
            className={styles.button}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>
        <Link to="/signup" className={styles.link}>Create a new account</Link>
      </div>
    </div>
  );
};

export default Login;