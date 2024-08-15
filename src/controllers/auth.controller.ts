import express from "express";
import { getUserByEmail } from "..\\models\\models.users";
import { random } from "helpers/auth.helper";

export const resgiter = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userame } = req.body;

    if (!(email || password || userame)) {
      return res.sendStatus(400);
    }

    const existingUser = getUserByEmail(email);

    if(existingUser){
        return res.sendStatus(400);
    }

  } catch (error) {
    console.log("Error occurred : " + error);
  }
};

export const login = async () => {};
