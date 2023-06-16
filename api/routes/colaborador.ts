import { Router } from "express"
import controller from "../controllers/colaborador.controller"
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin"
import verifyTokenAny from "../middlewares/verifyTokenAny"

const router = Router()

router.post("/", verifyTokenAdmin, controller.criar)
router.get("/", verifyTokenAny, controller.listar)
router.get("/:id", verifyTokenAny, controller.obterUm)
router.put("/", verifyTokenAdmin, controller.atualizar)
router.delete("/", verifyTokenAdmin, controller.excluir)

export default router
