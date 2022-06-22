import React from 'react';

export default function ProtectedHome(props) {
  const {data} = props
  
  const logout = () => {
    localStorage.removeItem('token');
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      {JSON.stringify(data)}
    </>
  );
}
