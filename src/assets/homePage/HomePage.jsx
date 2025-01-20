import { useEffect, useState } from 'react'
import { request } from '../../api/axios_helper.js'
import Header from '../header/Header.jsx'
import DOMPurify from 'quill/formats/link.js'

function HomePage(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    request('GET', '/api/post/all', {})
      .then((response) => {
        setPosts(response.data)
      })
  }, [])

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'p', 'a', 'img'],  // Allowing common formatting tags + <img>
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],  // Allowing href (for links), src (for images), alt, and title attributes
      ALLOWED_PROTOCOLS: ['http', 'https', 'ftp', 'mailto']  // Allowing HTTP/HTTPS protocols for links and images
    })
  }

  const printPost = (post) => {
    const content = sanitizeContent(post.content)
    return (
      <div key={post.id} className={'post-card'}>
        <h2>{post.title}</h2>
        <span className={'separator'}></span>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <span className={'separator'}></span>
        <p>By {post.username}</p>
      </div>
    )
  }

  return <>
    <Header />
    <h1>Home page</h1>
    <div className={'posts'}>
      {posts.length !== 0 && posts.map(printPost)}
    </div>
  </>
}

export default HomePage