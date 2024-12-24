import React from 'react'

function NewPost({ postTitle, postBody, setPostTittle, setPostBody, handleSubmit}) {
  return (
    <main className='NewPost'>
      <h2>newpost</h2>
      <form onSubmit={handleSubmit} className='newPostForm'>
        <label htmlFor="postTitle">Title:</label>
        <input 
        type="text"
        id='postTitle'
        required
        value={postTitle}
        onChange={(e)=>setPostTittle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
        id='postBody'
        required
        value={postBody}
        onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type='submit'>submit</button>
      </form>
    </main>
  )
}

export default NewPost