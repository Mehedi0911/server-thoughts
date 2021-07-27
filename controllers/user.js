import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

//controller for singing the user IN
export const signin = async (req, res) => {
    const { email, password } = req.body;
    

    try {
        //checking whether the user exists
        const existingUser = await User.findOne({email}); 

        if(!existingUser) return res.status(404).json({ message: "User Doesn't exists"})

        //If User exists, checking whether the password is valid
        const isPasswordValid = await bcrypt.compare( password, existingUser.password);

        if(!isPasswordValid) return res.status(400).json({ message : "Invalid Credentials" });

        //if everything is ok, we are creating token for the user to login and sending the user to the front end
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'thoughts3mehedi091', { expiresIn:"1h"});

        res.status(200).json({ result : existingUser, token});

    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong'});
    }
}

//controller for singing up the user/ creation of new account
export const signup = async (req, res) => {
    const { email, password, confirmedPassword, firstName, lastName} = req.body;
    console.log(req.body);
    try {
         //checking whether the user exists
         const existingUser = await User.findOne({email});
         
         if(existingUser) return res.status(400).json({ message: "User ALready Exists"});
        
         //checking whether the both password matches.
         if(password !== confirmedPassword) return res.status(400).json({ message: "Password doesn't match"});

         //hashing the password for user security
         const hashedPassword = await bcrypt.hash( password, 12);

        // creating the user
         const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})
        
         //creating the token for user
         const token = jwt.sign({ email: result.email, id: result._id}, 'thoughts3mehedi091', { expiresIn:"1h"});

         res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong'});
    }
}
