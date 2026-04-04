import express from 'express'
import { loginUser, signUpUser } from '../Controllers/authControler';

const authRouter = express.Router()

authRouter.post('/sign-up', signUpUser)
authRouter.post('/sign-in', loginUser)

export default authRouter;
