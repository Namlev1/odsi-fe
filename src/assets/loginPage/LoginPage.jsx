import { useState } from 'react';
import './LoginPage.css';
import { request, setAuthToken } from '../../api/axios_helper.js'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    request('POST', '/login', {
      username: username,
      password: password
    })
      .then(response => {
        setAuthToken(response.data.token) 
      })
      .catch(error => console.log('Login failed. ' + error))
  };

  return (
    <>
      <h1>Please sign in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export default LoginPage;