import { Router } from "express"
import controller from "../controllers/agendamento.controller"

const router = Router()

router.post("/", controller.criar)
router.get("/", controller.listar)
router.get("/:id", controller.obterUm)
router.put("/", controller.atualizar)
router.delete("/", controller.excluir)

export default router
