import { Router } from "express"
import { aluno } from "../controllers/aluno.controller"

const router = Router()

router.post("/", aluno.create)

router.get("/", aluno.getAll)

router.get("/createTable", aluno.createTable)
router.get("/deleteTable", aluno.deleteTable)
export default router
