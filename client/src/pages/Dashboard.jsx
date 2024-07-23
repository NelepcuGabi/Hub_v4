import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Typography, Spin } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      navigate('/login'); // Redirect to login if no user data
    } else {
      setLoading(false);
    }
  }, [userData, navigate]);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    navigate('/login'); // Redirect to login on logout
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card className="profile-card">
      <div className="profile-content">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} strong className="username">
          {userData.name}
        </Typography.Title>
        <Typography.Text type="secondary" strong>
          Email: {userData.email}
        </Typography.Text>
        <Typography.Text type="secondary" strong>
          Role: {userData.role}
        </Typography.Text>
        <Button 
          size="large" 
          type="primary" 
          className="profile-btn" 
          onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default Dashboard;
