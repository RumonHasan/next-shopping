import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async(req,res)=>{
    await db.connect();
    // creating a new user instance
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),
        isAdmin:false,
    })
    // new user
    const createdUser = await newUser.save();
    await db.disconnect();
    const token = signToken(createdUser); // creating new user and sending back user data but the password
    res.send({token,
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
    })
    
})

export default handler;