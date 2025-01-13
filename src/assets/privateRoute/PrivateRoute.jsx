import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../api/axios_helper.js'

const PrivateRoute = ({ children }) => {

  if (!isAuthenticated()) {
    return <Navigate to={'/login'} />
  }

  return children
}

export default PrivateRoute