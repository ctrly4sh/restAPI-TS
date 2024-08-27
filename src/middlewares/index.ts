import express from 'express'
import {get , merge} from "lodash"
import { getUserBySessionToken } from '../models/users'

export const isAuthenticated = async (req : express.Request , res : express.Response , next : express.NextFunction) => {
    try{

    const sessionToken = req.cookies['Y4SH-AUTH']
    
    if(!sessionToken){
        return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken)

    if(!existingUser){
        return res.sendStatus(403)
    }
    
    merge(req , {identity : existingUser})
    
    return next()

    }catch(exe){
        return res.status(400).json({
            message :  `Error occurred : ${exe}`
        })
    }
}