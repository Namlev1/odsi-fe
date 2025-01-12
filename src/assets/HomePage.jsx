import { useEffect, useState } from 'react'
import { isAuthenticated, request } from '../api/axios_helper.js'
import { Navigate } from 'react-router-dom'

function HomePage(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    request('GET', '/api/post/me', {})
      .then((response) => {
        setPosts(response.data)
      })
  }, [])
  
  if(!isAuthenticated()){
    return <Navigate to={'/login'}/>
  }

  return <>
    <p>Home page</p>
    {posts.length !== 0 && posts.map(post => <p>{post.title}</p>)}
  </>
}

export default HomePage