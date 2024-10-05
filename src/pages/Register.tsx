import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
    }}>
      <RegisterForm />
    </div>
  );
};

export default Register;
