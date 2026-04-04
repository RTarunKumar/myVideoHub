import { Request, RequestHandler } from "express"
import User from "../model/userSchema"
import { sendResponse } from "../Utils/sendResponse"
import crypto from 'crypto'
import { compareHashedPassword, hashPassword } from "../Utils/passwordHelper"
import { generateJwtToken } from "../Utils/generateJwtToken"

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
    return sendResponse(res, 200, true, 'LoggedIn', {user:jwtToken})
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, false, 'Internal server error')
  }
}