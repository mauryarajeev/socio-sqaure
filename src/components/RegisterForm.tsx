import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../features/api';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../features/userSlice';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdAccountCircle } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import './RegisterForm.css'; 

interface IFormInput {
  name: string;
  email: string;
  username: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      dispatch(registerSuccess(response));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="form-container">
      <div className="login-header">
      <h2 className="login-title">Register</h2>
      <FaUserPlus className="login-icon" />
    </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="input-row">
            <label className="label">
              <MdPerson size={25} className="icon"/>
              <span>Full Name</span>
            </label>
            <input type="text" {...register('name')} placeholder="Full Name" required />
          </div>
          <div className="input-row">
            <label className="label">
              <MdEmail size={25} className="icon"/>
              <span>Email</span>
            </label>
            <input type="email" {...register('email')} placeholder="Email" required />
          </div>
          <div className="input-row">
            <label className="label">
              <MdAccountCircle size={25} className="icon"/>
              <span>Username</span>
            </label>
            <input type="text" {...register('username')} placeholder="Username" required />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="link">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
