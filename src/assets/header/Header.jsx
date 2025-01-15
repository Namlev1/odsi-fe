import { removeAuthToken, request } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'
import './Header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    try {
      request('POST', '/auth/logout')
        .then(() => {
          removeAuthToken()
          navigate('/login')
        })
        .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }
  return <header>
    <button onClick={() => navigate('/create')}>Create new post</button>
    <button onClick={handleLogout}>Log out</button>
  </header>
}

export default Header