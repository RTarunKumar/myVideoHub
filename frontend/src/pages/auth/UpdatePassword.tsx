import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import backendApi from "../../api/backendApi"
import { toast } from "sonner"
import Layout from "../../Components/Layout"

interface UpdatePasswordResponse{
    success:boolean,
    message:string
}

const UpdatePassword:React.FC = () => {

    const {token} = useParams<{ token : string }>()
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate= useNavigate()

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setLoading(true)

        try {
            const {data} = await backendApi.post<
            UpdatePasswordResponse>
            (`/api/v1/auth/update-password/${token}`, 
                {password});

            if(data.success){
                toast.success(data.message)
                navigate('/sign-in')
            }else{
                toast.warning(data.message)
                navigate('/sign-up')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }finally{
            setLoading(false)
        }
    }

  return (
    <Layout>
        <div className='p-4'>
            <div>
                <h1>Update your password</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor=""></label>
                        <input 
                        type="password" 
                        name='password' 
                        required value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button 
                        type='submit'
                        disabled={loading}>
                            Update Password
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

export default UpdatePassword