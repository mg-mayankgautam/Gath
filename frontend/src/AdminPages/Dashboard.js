import React from 'react'
import useAuth from '../hooks/useAuth'
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import CustomerDashboard from '../components/Customer/CustomerDashboard';


const Dashboard = () => {

    const {auth} = useAuth();

  return (
    <div>
        {auth.role === 'ADMIN' && <AdminDashboard />}
        {auth.role === 'EMPLOYEE' && <EmployeeDashboard />}
        {auth.role === 'USER' && <CustomerDashboard/>}
    </div>
  )
}

export default Dashboard