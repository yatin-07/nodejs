import express, { Request, Response } from 'express';
const authrouter = express.Router();
import Userschema from '../models/users'
import schema from '../models/validate'


authrouter.post('/register', async (req: Request , res: Response )=> {
      const { error } =  schema.validateAsync(req.body, schema);
      if (error)
        return res.send(error);
      

        const user = new Userschema({
            name: req.body.name,
            date: req.body.date,
            email: req.body.email,
            password: req.body.password
        });
        try{
            const saveduser = await user.save();
            res.send(saveduser);
        }
            catch(err)
                {
                    res.status(400).send(err);
                        
                    
                }
    })


export default authrouter;