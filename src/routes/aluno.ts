import { Request, Response, Router } from "express"
import { aluno } from "../controllers/aluno.controller"

const router = Router()

router.post("/create", (_req: Request, res: Response) => {
  aluno.create()
  res.send({ name: "server online" })
})

router.get("/", aluno.getAll)

export default router
