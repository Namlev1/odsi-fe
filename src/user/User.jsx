import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { request } from '../api/axios_helper.js'
import Header from '../assets/header/Header.jsx'
import DOMPurify from 'quill/formats/link.js'
import Icon from '@mdi/react'
import { mdiCheckDecagram } from '@mdi/js'

const User = () => {
  const { username } = useParams()

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request(
          'GET',
          `/api/v1/user/${username}`
        )
        setUser(response.data)
      } catch (e) {
        console.error('Error while fetching post: ' + e)
      }
    }

    const fetchPosts = async () => {
      try {
        const response = await request(
          'GET',
          `/api/post/user/${username}`
        )
        setPosts(response.data)
      } catch (e) {
        console.error('Error while fetching user: ', e)
      }
    }
    fetchUser()
    fetchPosts()
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
        <div className={'flex-row'}>
          <h2>{post.title}</h2>
          {post.signature && <Icon path={mdiCheckDecagram} size={1} color={'green'} />}
        </div>
        <span className={'separator'}></span>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    )
  }
  console.log(user)

  return <>
    <Header />
    <h1>{username} profile</h1>
    <h2>Public key:</h2>
    {(user && user.pubKey) ?
      <>
          <pre>{user.pubKey}</pre>
      </>
      :
      <div>
        <p>
          This user doesn&#39;t have a public key.
        </p>
      </div>
    }
    <h2>Posts:</h2>
    <div className={'posts'}>
      {posts.length !== 0 && posts.map(printPost)}
    </div>
  </>
}

export default User