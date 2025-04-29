import React, { useState } from 'react';
import axios from 'axios';

const AdminCreate = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccessMessage('');

    if (!id.trim() || !password.trim()) {
      setError('ID and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/adminsignup`, {  // Changed endpoint
        id,
        password,
      });
      console.log(response.data);
      setSuccessMessage(response.data.message); //show success message
      setId('');
      setPassword('');

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create admin user');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin User Create</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default AdminCreate;
