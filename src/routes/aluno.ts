import { Router } from "express"
import { aluno } from "../controllers/aluno.controller"

const router = Router()

router.post("/", aluno.create) // C

router.get("/:id", aluno.getById) // R
router.get("/", aluno.getAll)

router.patch("/", aluno.update) // U
router.delete("/:id", aluno.delete) // D

export default router
