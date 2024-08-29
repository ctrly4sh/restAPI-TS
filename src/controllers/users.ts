import express from "express"
// import { userModel } from "models/users"
// import { getUsers } from "./../models/users"
// import {userModel } from "./../models/users"

import { deleteUserByID, userModel , deleteUserByEmail } from "./../models/users" 

export const getAllUsers = async (req : express.Request , res :express.Response) => {
    try{
      const allUsers = await userModel.find();
      console.log(allUsers)
      return res.status(200).json({
        allUsers
      })
    }
    catch(exe){
        console.log(`Error occurred ${exe}`)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req : express.Request, res: express.Response) => {
  const { email } = req.params
  const deletedUser = await deleteUserByEmail(email)
  return res.json({ deletedUser })
}