import { Router } from "express";
import { authCheck } from "../middleware/authCheck";
import { BlogDetail, BlogEdit, CreateBlog, deleteBlog, ListBlog } from "../controllers/blog";

const router = Router()

router.post('/', authCheck , CreateBlog)
router.put('/:id', authCheck , BlogEdit)
router.get('/', authCheck , ListBlog)
router.get('/blog-detail/:id', authCheck , BlogDetail)
router.delete('/:id', authCheck, deleteBlog)

export default router
