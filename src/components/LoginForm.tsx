import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'; 
import './LoginForm.css'; 

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [isPopupVisible, setPopupVisible] = useState(false); 

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data); 
    setPopupVisible(true); 
  };

  const closePopup = () => {
    setPopupVisible(false); 
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`container ${isPopupVisible ? 'blur-background' : ''}`}
      >
        <div className="form-container">
          <div className="login-header">
            <h2 className="login-title">Login</h2>
            <FiLock className="login-icon" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="input-row">
              <label className="label">
                <FiMail size={25} className="icon" />
                <span>Email</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            <div className="input-row">
              <label className="label">
                <FiLock size={25} className="icon" />
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Password"
              />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}

            <button type="submit">Login</button>
          </form>
          <p className="link">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </motion.div>

      {isPopupVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="popup"
        >
          <div className="popup-content">
            <h2 className="animated-text">
              <FiAlertCircle className="popup-icon" /> Coming Soon!
            </h2>
            <p className="mt-2 animated-text">We're working on this feature and it will be available shortly.</p>
            <button onClick={closePopup}>
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LoginForm;
