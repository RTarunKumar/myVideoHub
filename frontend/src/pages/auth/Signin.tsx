import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import type { AuthFormData } from '../../types'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../reducers/auth/store'
import { signInUser } from '../../reducers/auth/authReducer'


const SignIn:React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [formData, setFormData] = useState<AuthFormData>({
        email:'',
        password:''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target 
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const {email, password} = formData
        dispatch(signInUser({email, password}))
    }
    
  return <Layout>
        <div className='flex items-center justify-center p-4 w-full'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Join us Today
                </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">
                            Email
                        </label>
                        <input 
                        value={formData.email}
                        onChange={handleChange}
                        type="text" 
                        name='email' 
                        required 
                        placeholder='Your Email'
                        className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
                        />
                    </div>
                    <div>
                        <label htmlFor="">
                            Email
                        </label>
                        <input 
                        value={formData.password}
                        onChange={handleChange}
                        type="password" 
                        name='password' 
                        required 
                        placeholder='Your Password'
                        className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
                        />
                    </div>
                    <button 
                    type='submit'
                    className='mt-1 block w-full px-4 bg-green-500 text-white fobt-bold rounded-md shadow-md transition duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center'
                    >SignIn</button>
                </form>
                <Link 
                to={'/sign-up'}
                className='text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-300'
                >
                Sign-Up for free
                </Link>
            </div>
        </div>
    </Layout>
  
}

export default SignIn