import db from '../config/connect'
import { Request, Response } from 'express'
import { BlogData } from '../interface/blog.interface'

export const CreateBlog = async(req: Request, res: Response) => {
    try {
        const {title , description} = req.body as BlogData
        const uid = req.user.id

        await db.query('INSERT INTO blog (user_id , title, description) VALUES(?,?,?)', [uid, title, description])

        res.json({message: "เพิ่มบล็อกสำเร็จ"})

    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}

export const BlogEdit = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const uid = req.user.id
        const {title , description} = req.body as BlogData

        const [checkBlog]: any = await db.query('SELECT user_id FROM blog WHERE id = ?', [id])

        const c = checkBlog[0]

        // ไม่เจอ blog
        if(!c) {
            return res.status(403).json({message: "ไม่พบ blog"})
        }

        // เช็คสิทการแก้ไขต้องเป็นของตัวเองเท่านั้น
        if(c.user_id !== uid) {
            return res.status(403).json({message: "blog ต้องเป็นของตัวเอง"})
        }

        await db.query('UPDATE blog SET title = ? , description = ? WHERE id = ?', [title , description , id])
        res.json({message: "แก้ไข blog สำเร็จ"})

    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}

export const ListBlog = async(req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query('SELECT * FROM blog')
        res.json({rows})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}

export const BlogDetail = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const [rows]: any = await db.query('SELECT * FROM blog WHERE id = ?', [id])
        res.json({rows})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}


export const deleteBlog = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        await db.query('DELETE FROM blog WHERE id = ?', [id])
        res.json({message: "ลบ blog สำเร็จ"})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Server Error"})
    }
}