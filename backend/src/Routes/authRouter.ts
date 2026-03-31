import express from 'express'
import { signUpUser } from '../Controllers/authControler';

const authRouter = express.Router()

authRouter.post('/sign-up', signUpUser)

export default authRouter;
