import { Request, RequestHandler } from "express"
import User from "../../model/userSchema"
import { sendResponse } from "../../Utils/sendResponse"
import crypto from 'crypto'
import { compareHashedPassword, hashPassword } from "../../Utils/passwordHelper"
import { generateJwtToken } from "../../Utils/generateJwtToken"
import { resetPasswordEmail } from "../../mailer/resetPasswordMail"

interface RegisterReg extends Request{
    body:{
        email:string,
        password:string
    }
}

export const signUpUser : RequestHandler = async (req:RegisterReg,res) => {
    try {
        const {email,password} =req.body
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return sendResponse(res, 400, false, 'User already existed')
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            email, password: hashedPassword, token: crypto.randomBytes(16).toString('hex')
        })

        return sendResponse(res, 200, true, 'user created successfully')
    } catch (error) {
        return(sendResponse(res, 500, false, 'User not created'))
    }
}

export const loginUser : RequestHandler = async (req:RegisterReg, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return sendResponse(res, 404, false, 'Account dosnt exist')
    }
    const matchPassword = await compareHashedPassword(password, user.password)
    if(!matchPassword) return sendResponse(res, 400, false, 'Password doesnt match')
    const jwtToken  = await generateJwtToken(user)   
    return sendResponse(res, 200, true, 'LoggedIn Successfully', {user:{token: jwtToken}})
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, false, 'Internal server error')
  }
}

export const sendEmailForResetPassword : RequestHandler =async(req,res)=>{
    try {
        const {email} = req.body;
        if(!email){
            return sendResponse(res, 404, false, 'email not found')
        }
        const user = await User.findOne({email});
        if(!user){
            return sendResponse(res, 404, false, 'user not found')
        }
        await resetPasswordEmail(user);
        sendResponse(res, 200, true, 'Check your mail to reset your password')
    } catch (error) {
        console.log('Error sending')
        sendResponse(res, 500, false, 'Internal server error')
    }
}

export const updatePassword : RequestHandler = async(req, res)=>{
    try {
        const {token} = req.params
        const {password} = req.body
        if(!token){
            return sendResponse(res, 404, false, 'token not found')
        }
        const user = await User.findOne({token});
        if(!user){
            return sendResponse(res, 404, false, 'user not found')
        }
        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        await user.save()
        return sendResponse(res, 200, true, 'Password reset successfully')
    } catch (error) {
        console.error('Error sending')
        sendResponse(res, 500, false, 'Internal server error')
    }
}