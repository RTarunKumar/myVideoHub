import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import { useSelector } from 'react-redux'
import { slelectLoggedInUser } from '../../reducers/auth/authReducer'

const UserProfile: React.FC = () => {

  const loggedInUser = useSelector(slelectLoggedInUser)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)

  useEffect(()=>{
    if(loggedInUser?.name)setName(loggedInUser.name)
    if(loggedInUser?.email)setEmail(loggedInUser.email)
  },[loggedInUser])

  return (
    <div className='flex w-full pr-2 h-screen'>
      <Sidebar/>
      <main className='flex-1 ml-4 lg:ml-[17rem] pr-2 z-10'>
        <section className='p-4 bg-white shadow-lg rounded-lg w-full border border-gray-500 mt-7'>
          <h1 className='text-center font-semibold text-xl text-gray-700 mb-5'>
            Personal Details
          </h1>
          <div className='container flex flex-col gap-4'>
            <div className='flex items-center'>
              <div className='flex flex-col w-full'>
                <label htmlFor="name" className='font-medium text-gray-600'>
                  Name
                </label>
                <div className='relative'>
                  <input 
                  type="text" 
                  name='name' 
                  placeholder='Enter your name'
                  disabled={!edit}
                  value={name} 
                  onChange={(e)=>setName(e.target.value)}
                  className={`w-full focus:outline-none border rounded-md 
                    ${edit ? 'border-blue-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 bg-gray-100`}
                  />
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex flex-col w-full'>
                <label htmlFor="email" className='font-medium text-gray-600'>
                  Email
                </label>
                <div className='relative'>
                  <input 
                  type="text" 
                  name='email' 
                  placeholder='Enter your email'
                  disabled={!edit}
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)}
                  className={`w-full focus:outline-none border rounded-md 
                    ${edit ? 'border-blue-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 bg-gray-100`}
                  />
                </div>
              </div>
              </div>
            </div>
            <div className='justify-end'>
              <button type='button' onClick={()=>setEdit(!edit)}>
                {edit? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UserProfile