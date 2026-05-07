import express from 'express'
import { getUserDetails, updateuser } from '../Controllers/user/userControler'
const userRouter = express.Router()

userRouter.get('/profile', getUserDetails)
userRouter.post('/update', updateuser)

export default userRouter
