import  { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as unknown as string;


const verifyAuthToken= async (req: Request, res: Response, next: NextFunction):Promise<void> =>{
  try{
    // console.log(req.headers.authorization)
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    
    const decode =jwt.verify(token, TOKEN_SECRET);
   
    if(decode){
      next() 
    } else{
      res.status(401).json({
      error: 'you are not authorized'
        
      })
    }
  }catch (err) {
    res.status(400);
    throw new Error(`user not created` + err);
  }


}

export default verifyAuthToken;