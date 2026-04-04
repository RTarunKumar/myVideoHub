import React, {type ReactNode} from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface LayoutProps{
    children:ReactNode
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <nav className='flex items-center bg-black p-4 justify-end top-0 z-50 w-full text-white'>
        <div className='flex items-center gap-3 capitalize'>
          <Link to={'/'}>Home</Link>
          <Link to={'/all-videos'}>All Videos</Link>
          <Link to={'/sign-in'}>Sign in</Link>
        </div>
      </nav>
        <header>Welcome back</header>
        <main className='flex-1 flex flex-col items-center w-full mt-16'>
          {children}
        </main>
        <footer>
          <div>
            <a 
            href=""><FaGithub size={24}
            target='_blank'
            // rel='noopener noreferre'
            aria-label='Github'
            />
            </a>
            <a 
            href=""><FaLinkedin size={24}
            target='_blank'
            // rel='noopener noreferre'
            aria-label='LinkedIn'
            />
            </a>
            <a 
            href=""><FaTwitter size={24}
            target='_blank'
            // rel='noopener noreferre'
            aria-label='Twitter'
            />
            </a>
          </div>
          <p className='text-sm text-gray-400 mb-2'>
            Sharing the joy of videos with the world.
          </p>
          <p className='text-sm text-gray-400 mb-2'>
            Copyright @ 2024 My Videos Hub. All rights reversed.
          </p>
        </footer>
    </div>
  )
}

export default Layout