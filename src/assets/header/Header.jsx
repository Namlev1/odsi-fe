import { removeAuthToken, request } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'

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
  return <div>
    <span className={'flex-grow'}></span>
    <button onClick={handleLogout}>Log out</button>
  </div>
}

export default Header