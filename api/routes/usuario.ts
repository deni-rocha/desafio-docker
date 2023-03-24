import { Router } from "express"
import controller from "../controllers/usuario.controller"

const router = Router()

router.get("/", controller.listar)
router.get("/:id", controller.obterUm)
router.put("/", controller.atualizar)
router.delete("/", controller.excluir)

export default router
