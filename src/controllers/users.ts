import db from '../config/connect'
import { Request , Response } from "express"
import { UserBody } from '../interface/user.interface'
import { hashPassword, verifyToken } from '../service/auth.service'

export const ListUser = async(req: Request , res: Response) => {
    try {
        const [rows]: any = await db.query('SELECT id, fname, lname, username , role FROM users')
        res.json({
            message: 'success',
            rows
        })
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}

export const ChangeByUser = async(req: Request , res: Response) => {
    try {
        const uid = req.user.id
        const { fname , lname , username, password} = req.body as UserBody

        const hash = await hashPassword(password)
        await db.query("UPDATE users SET fname = ?, lname = ?, username = ?, password = ? WHERE id = ?",[fname, lname, username, hash , uid]);


        res.json({message: "แก้ไขสำเร็จ"})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}


export const ProfileMe = async(req: Request , res: Response) => {
    try {
        const id = req.user.id
        const [row]: any = await db.query('SELECT * FROM users WHERE id = ?', [id])
        res.json({row})
    }catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}