import React, { useEffect } from 'react';
import { useFetchUsersQuery } from '../features/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '../redux/store';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import './Dashboard.css';  

const Dashboard: React.FC = () => {
  const { data: users, error, isLoading } = useFetchUsersQuery();
  const registered = useSelector((state: RootState) => state.user.registered);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registered) {
      navigate('/register');
    }
  }, [registered, navigate]);

  if (isLoading) return <div className="text-center mt-10 text-2xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error fetching users</div>;

  return (
    <div>
         {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">User Dashboard</h1>
      </header>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-container"
    >
     

      {/* Responsive grid for all devices */}
      <div className="dashboard-grid">
  {users?.map((user) => (
    <motion.div
      key={user.id}
      className="dashboard-card"
      whileHover={{ scale: 1.05 }}
    >
        <h3 className="dashboard-card-title">
        <FaUser className="icons" /> {user.name}
    </h3>
    <p className="icon-text">
        <FaEnvelope className="icons" /> {user.email}
    </p>
    <p className="icon-text">
        <FaUser className="icons" /> {user.username}
    </p>
    </motion.div>
  ))}
</div>

    </motion.div>
    </div>
  );
};

export default Dashboard;
