import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from '../../../models/User'

import db from "../../../utils/db";
import { signToken, isAdmin,isAuth } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth,isAdmin);

handler.get(async (req, res) => {
  try {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    return res.send(users);
  } catch (error) {
      console.log(error)
      return res.send(error)
  }
});


export default handler;