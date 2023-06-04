import "dotenv/config"
import express from "express"
import cors from "cors"
import verificarToken from "../src/middlewares/verificarToken"
import loaders from "../src/loaders"

// importação de rotas
import usuario from "../src/routes/usuario"
import servico from "../src/routes/servico"
import agendamento from "../src/routes/agendamento"
import horario from "../src/routes/horario"

// configurações
const app = express()
app.use(cors())
app.use(express.json())

// conectar banco de dados
loaders.startDB()

// rotas
app.use("/api/usuario", verificarToken, usuario)
app.use("/api/servico", verificarToken, servico)
app.use("/api/agendamento", verificarToken, agendamento)
app.use("/api/horario", verificarToken, horario)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`http://localhost:${porta}`))
