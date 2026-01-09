import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../service/auth.service'


export const authCheck = async(req: Request , res: Response , next: NextFunction) => {
    try {
        const header = req.headers.authorization
        const token = header?.split(' ')[1]

        if(!token) {
            return res.status(400).json({message: "No Token!"})
        }
        const decode = verifyToken(token)
        req.user = decode
        console.log(req.user)
        next()
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Token Invalid!!"})
    }
}