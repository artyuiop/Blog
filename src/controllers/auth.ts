import { Request , Response } from "express"
import db from '../config/connect'
import { comparePassword, GenToken, hashPassword } from "../service/auth.service"
import { LoginBody } from "../interface/auth.interface"
import { UserBody } from "../interface/user.interface"

export const register = async(req: Request, res: Response) => {
    try {
        const {fname, lname , username, password} = req.body as UserBody

        if(![fname, lname , username, password].every(Boolean)) {
            return res.status(403).json({message: "โปรดกรอกข้อมูลให้ครบ"})
        }

        const [rows]: any = await db.query('SELECT id FROM users WHERE username = ?', [username])

        if(rows.length > 0) {
            return res.status(403).json({message: "ชื่อผู้ใช้งานซํ้า"})
        }


        const hash = await hashPassword(password)
        await db.query('INSERT INTO users(fname, lname , username , password) VALUES (?,?,?,?)', [fname, lname, username, hash])

        res.json({message: "สมัครสมาชิกสำเร็จ!!"})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}


export const login = async(req: Request, res: Response) => {
    try {
        const {username , password} = req.body as LoginBody

        if(![username, password].every(Boolean)) {
            return res.status(403).json({message: "โปรดกรอกข้อมูลให้ครบ"})
        }

        const [rows]: any = await db.query('SELECT id, fname, lname, username, password FROM users WHERE username = ?', [username])

        if(rows.length === 0) {
            return res.status(403).json({message: "ไม่มีชื่อผู้ใช้งาน"})
        }

        const user = rows[0]
        const isMath = await comparePassword(password, user.password)

        if(!isMath) {
            return res.status(403).json({message: "รหัสไม่ถุกต้อง"})
        }

        // PayLoad
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }

        // getToken
        const token = GenToken(payload)
        
        res.json({
            message: "เข้าสู่ระบบสำเร็จ!!",
            ...token,
            payload
        })
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}