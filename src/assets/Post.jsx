import { useParams } from 'react-router-dom'
import Header from './header/Header.jsx'
import Icon from '@mdi/react'
import { mdiCheckDecagram } from '@mdi/js'
import DOMPurify from 'quill/formats/link.js'
import { useEffect, useState } from 'react'
import { request } from '../api/axios_helper.js'

const Post = (props) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await request(
          'GET',
          `/api/post/${id}`
        )
        setPost(response.data)
      } catch (e) {
        console.error('Error while fetching post: ' + e)
      }
    }
    fetchPost()
  }, [])

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'p', 'a', 'img'],  // Allowing common formatting tags + <img>
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],  // Allowing href (for links), src (for images), alt, and title attributes
      ALLOWED_PROTOCOLS: ['http', 'https', 'ftp', 'mailto']  // Allowing HTTP/HTTPS protocols for links and images
    })
  }

  const printPost = (post) => {
    if (!post) {
      return
    }
    const content = sanitizeContent(post.content)
    return (
      <div key={post.id} className={'post-details'}>
        <div className={'flex-row'}>
          <h2>{post.title}</h2>
          {post.signature && <Icon path={mdiCheckDecagram} size={1} color={'green'} />}
        </div>
        <span className={'separator'}></span>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <span className={'separator'}></span>
        <p>By {post.username}</p>
        {post.signature && <>
          <span className={'separator'}></span>
          <h3>Signature</h3>
          <p>{post.signature}</p>
        </>
        }
      </div>
    )
  }

  return <>
    <Header />
    <h1>Post details:</h1>
    {printPost(post)}
  </>
}

export default Post