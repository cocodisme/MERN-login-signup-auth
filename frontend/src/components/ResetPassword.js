import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState({ success: '', message: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/resetpassword', { email })
      .then((res) => {
        setMsg({ success: res.data.success, message: res.data.message });
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
    <>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          name="email"
        />
        <button type="submit">Reset Password</button>
      </form>
      {msg != {} && <p>{JSON.stringify(msg)}</p>}
    </>
  );
}
export function NewPassword() {
  let { token } = useParams();
  const [newPassword, setNewPassword] = React.useState('');
  const [verifytoken, setVerifyToken] = React.useState({
    success: '',
    message: '',
  });
  const [msg, setMsg] = React.useState({ success: '', message: '' });

  React.useEffect(() => {
    axios.get(`/api/resetpassword/${token}`).then((res) => {
      setVerifyToken({ success: res.data.success, message: res.data.message });
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/resetpassword/${token}`, { password: newPassword })
      .then((res) => {
        setMsg({ success: res.data.success, message: res.data.message });
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
    <>
      {verifytoken.success && (
        <>
          <h1>New Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              name="password"
            />
            <button type="submit">Reset Password</button>
          </form>
        </>
      )}
      {verifytoken != {} && <p>{verifytoken.message}</p>}
      {msg != {} && <p>{msg.message}</p>}
    </>
  );
}
