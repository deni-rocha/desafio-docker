import { Router } from "express"
import agendamento from "../controllers/agendamento.controller"
import servico from "../controllers/servico.controller"
import usuario from "../controllers/usuario.controller"

const router = Router()

router.get("/usuario", usuario.listarTodos)
router.post("/servico", servico.novo)
router.get("/servico", servico.listar)
router.post("/agendamento", agendamento.novo)
router.get("/agendamento", agendamento.listar)
export default router
