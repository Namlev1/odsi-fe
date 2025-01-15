import { useEffect, useState } from 'react'
import { request } from '../api/axios_helper.js'
import Header from './header/Header.jsx'

function HomePage(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    request('GET', '/api/post/all', {})
      .then((response) => {
        setPosts(response.data)
      })
  }, [])

  return <>
    <Header />
    <p>Home page</p>
    {posts.length !== 0 && posts.map(post =>
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <p>By {post.username}</p>
      </div>
    )}
  </>
}

export default HomePage