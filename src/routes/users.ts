import { Router } from "express";
import { ChangeByUser, ListUser, ProfileMe } from "../controllers/users";
import { authCheck } from "../middleware/authCheck";

const router = Router()

router.get('/',authCheck, ListUser)
router.put('/change', authCheck, ChangeByUser)
router.get('/profile', authCheck , ProfileMe)

export default router
