import React from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import apis from './apis/posts'
import { useContext } from 'react'
import dataContext from './context/dataContext'

const PostDetails = () => {
  const {posts,setPosts} = useContext(dataContext);
    const {id} = useParams();
    const post = posts.find(post=> (post.id).toString() === id)
    const navigate = useNavigate()

    const handleDelete = async (id) =>{
      try{
        await apis.delete(`/posts/${id}`)
        const postItems = posts.filter((post) => post.id !== id);
        setPosts(postItems);
        navigate('/')
      }catch(err){
        console.log(`Error: ${err.message}`)
      }
      
    }

    

  return (
    <main className='PostDetails'>
        <article className="post">
          { post &&
            <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className='editButton'>Edit post</button></Link>
              <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                  Delete post
              </button>
            </>
          }
          {!post &&
            <>
                <h2>Post Not Found</h2>
                <p>Well that's disappointing.</p>
                <p>
                  <Link to={'/'}>
                      Visit Our Homepage
                  </Link>
                </p>
            </>
          }
        </article>
    </main>
  )
}

export default PostDetails
