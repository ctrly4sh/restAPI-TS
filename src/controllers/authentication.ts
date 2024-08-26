import express from "express";
import { createUser, getUserByEmail } from "../models/users";
import { authentication, random } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!(email || password || username)) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    if(user){
      return res.json({
        message : `User ${user.username} created successffuly`
      })
    }

    return res.status(200);
  } catch (error) {
    console.log("Error occurred : " + error);
  }
};

export const login = async (req : express.Request , res : express.Response) => {
  try {

    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400)
    }
              
    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password")

    if(!user){
      res.sendStatus(400)
    }
    
    // else{
    //   return res.json({
    //     message : "User login successfully"
    //   })
    // }
   

    const expectedUserHashedPassword = authentication(user.authentication.salt , password) 

    if(user.authentication.password !== expectedUserHashedPassword){ 
      return res.sendStatus(403)
    }

    const salt = random()         

    user.authentication.sessionToken = authentication(salt , user._id.toString())

    await user.save();

    res.cookie("Y4SH-AUTH" , user.authentication.sessionToken , {domain : 'localhost' , path : "/"})

    res.status(200).json(user).end();

    return res.json({
      message : `you log in as ${user.username} successfully` 
    })

  } catch (exe) {
    return res.status(400).json({
      message : "Error occurred while log in in , kindly check the credentials !"
    })
  }
};
