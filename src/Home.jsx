import React from 'react'
import Feed from './Feed'

function Home({ post, fetchError, isLoading }) {
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (post.length ? <Feed post={post} /> : 
      <p className='statusMsg'>No posts to display.</p>)}
    </main>
  )
}

export default Home