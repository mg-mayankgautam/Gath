import React from 'react'
import useAuth from '../hooks/useAuth'
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard = () => {

    const {auth} = useAuth();

  return (
    <div>
        {auth.role === 'ADMIN' && <AdminDashboard />}
        {auth.role === 'EMPLOYEE' && <EmployeeDashboard />}
    </div>
  )
}

export default Dashboard