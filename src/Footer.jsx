import React from 'react'

function Footer() {
  const year = new Date()
  return (
    <footer className='Footer'>
      <p>Copyright &copy; {year.getFullYear()}</p>
    </footer>
  )
}

export default Footer