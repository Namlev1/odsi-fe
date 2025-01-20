import { Navigate } from 'react-router-dom'
import { isAuthenticated, removeAuthToken } from '../../api/axios_helper.js'

const PrivateRoute = ({ children }) => {

  if (!isAuthenticated()) {
    removeAuthToken()
    return <Navigate to={'/login'} />
  }

  return children
}

export default PrivateRoute