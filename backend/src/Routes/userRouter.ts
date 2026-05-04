import express from 'express'
import { getUserDetails } from '../Controllers/user/userControler'
const userRouter = express.Router()

userRouter.get('/profile', getUserDetails)

export default userRouter
