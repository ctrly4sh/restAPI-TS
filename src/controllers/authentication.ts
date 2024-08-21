import express from "express";
import { createUser, getUserByEmail } from "../models/users";
import { authentication, random } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userame } = req.body;

    if (!(email || password || userame)) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return res.sendStatus(400);
    }
    
    const salt = random();
    
    const user = await createUser({
      email,
      userame,
      authentication : {
        salt,
        password : authentication(salt,password),  
      }
    })
    
    return res.status(200)

  } catch (error) {
    console.log("Error occurred : " + error);
  }
};

export const login = async () => {};
