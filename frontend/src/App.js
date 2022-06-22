import React from 'react';
import {
  ResetPassword,
  NewPassword,
  Login,
  Signup,
  ProtectedHome,
} from './components';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  const token = localStorage.getItem('token');

  axios.defaults.baseURL = 'https://React-Native-Backend.cocodisme.repl.co';
  axios.defaults.headers.common['Authorization'] = token;

  const [data, setData] = React.useState();

  React.useEffect(() => {
    axios.get('/api/readme').then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Mern login/signup Example</h3>

      <Routes>
        {data && (
          <Route
            path={'/'}
            exact
            element={data.success ? <ProtectedHome data={data} /> : <Login />}
          />
        )}
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/resetpassword'} element={<ResetPassword />} />
        <Route path={'/resetpassword/:token'} element={<NewPassword />} />
      </Routes>
    </div>
  );
}
