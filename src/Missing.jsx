import React from 'react'
import { Link } from 'react-router-dom'

function Missing() {
  return (
    <main className='Missing'>
      <h2>Page NotFound</h2>
      <p>Well, that is disapointing</p>
      <Link to='/'><p>Visit our Homepage</p></Link>
    </main>
  )
}

export default Missing