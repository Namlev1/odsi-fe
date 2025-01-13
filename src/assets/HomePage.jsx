import { useEffect, useState } from 'react'
import { request } from '../api/axios_helper.js'

function HomePage(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    request('GET', '/api/post/me', {})
      .then((response) => {
        setPosts(response.data)
      })
  }, [])
  
  return <>
    <p>Home page</p>
    {posts.length !== 0 && posts.map(post => <p>{post.title}</p>)}
  </>
}

export default HomePage