import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function PostPage({ posts, handleDelete}) {
  const { id } = useParams();
  const post = posts.find(post=> ((post.id).toString() === id))
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
        <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
        <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete Post</button>
        </>}
        {!post && 
        <>
          <h2>Post Not Found</h2>
          <p>Well, that is disapointing</p>
          <Link to='/'><p>Visit our Homepage</p></Link>
        </>}
      </article>
    </main>
  )
}

export default PostPage