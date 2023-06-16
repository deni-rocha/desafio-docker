import { Router } from "express"
import controller from "../controllers/usuario.controller"
import verifyTokenAny from "../middlewares/verifyTokenAny"

const router = Router()

router.get("/", verifyTokenAny, controller.listar)
router.get("/:id", verifyTokenAny, controller.obterUm)
router.put("/", verifyTokenAny, controller.atualizar)
router.delete("/", verifyTokenAny, controller.excluir)

export default router
