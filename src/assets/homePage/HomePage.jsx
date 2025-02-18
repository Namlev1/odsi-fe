import { useEffect, useState } from 'react'
import { request } from '../../api/axios_helper.js'
import Header from '../header/Header.jsx'
import DOMPurify from 'quill/formats/link.js'
import { mdiCheckDecagram } from '@mdi/js'
import Icon from '@mdi/react'
import { Link, useNavigate } from 'react-router-dom'

function HomePage(props) {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

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
    const postUrl = '/post/' + post.id
    return (
      <div key={post.id} className={'post-card'}>
        <div className={'flex-row'}>
          <h2>{post.title}</h2>
          {post.signature && <Icon path={mdiCheckDecagram} size={1} color={'green'} />}
        </div>
        <span className={'separator'}></span>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <span className={'separator'}></span>
        <p>By <Link to={`/user/${post.username}`}>{post.username}</Link></p>
        <button onClick={() => navigate(postUrl, { state: { post } })}>Details</button>
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