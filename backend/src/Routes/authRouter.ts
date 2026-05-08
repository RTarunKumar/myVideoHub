import express from 'express'
import { loginUser, sendEmailForResetPassword, signUpUser, updatePassword } from '../Controllers/auth/authControler';

const authRouter = express.Router()

authRouter.post('/sign-up', signUpUser)
authRouter.post('/sign-in', loginUser)
authRouter.post('/reset-password', sendEmailForResetPassword)
authRouter.post('/update-password/:token', updatePassword)

export default authRouter;
