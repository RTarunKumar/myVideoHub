import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import backendApi from '../../api/backendApi'
import { toast } from 'sonner'

interface RequestResponse {
    success:boolean,
    message:string
}

const ResetPasswordEmail:React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            setLoading(true)
            const {data} = await backendApi.post<RequestResponse>('/api/v1/auth/reset-password',{
                email,
            })
            if(data.success){
                toast.success(data.message);
                setEmail('');
                navigate('/sign-in')
            }else{
                toast.warning(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally{
            setLoading(false)
        }
    }

  return (
    <Layout>
        <div className='p-4'>
            <div>
                <h1>Reset your password</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor=""></label>
                        <input 
                        type="email" 
                        name='email' 
                        required value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <button 
                        type='submit'
                        disabled={loading}>
                            Reset Password
                        </button>
                    </div>
                    <div>
                        <span>Not a member yet ?</span>
                        <Link to='/sign-up'>Signup for free</Link>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default ResetPasswordEmail