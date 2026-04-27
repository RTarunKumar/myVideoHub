import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import type { AuthFormData } from '../../types'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../reducers/auth/authReducer'
import type { AppDispatch } from '../../reducers/auth/store'


const Signup:React.FC = () => {
    const [formData, setFormData] = useState<AuthFormData>({
        email:'',
        password:''
    })

    //in TS all async type should always have type
    const dispatch = useDispatch<AppDispatch>()

    const handleOnchange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch(signUpUser(formData))
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
                        // onChange={(e)=>setFormData(e.target.value)}
                        onChange={handleOnchange}
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
                        onChange={handleOnchange}
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
                    >Signup</button>
                </form>
            </div>
        </div>
    </Layout>
  
}

export default Signup