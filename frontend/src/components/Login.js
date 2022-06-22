import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState({ success: '', message: '' });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/login', formValues)
      .then((res) => {
        setMsg({ success: res.data.success, message: res.data.message });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg({
          success: false,
          message: 'Server Error Please try again later',
        });
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email Address"
          name="email"
        />
        <input
          type="password"
          value={formValues.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/signup')}>New user</button>
      <button onClick={() => navigate('/resetpassword')}>
        Forgot password
      </button>
      {msg != {} && <p>{msg.message}</p>}
    </div>
  );
}
