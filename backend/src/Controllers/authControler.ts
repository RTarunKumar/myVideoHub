import { Request, RequestHandler } from "express"
import User from "../model/userSchema"
import { sendResponse } from "../Utils/sendResponse"
import crypto from 'crypto'
import { hashPassword } from "../Utils/passwordHelper"

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