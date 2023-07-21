import "dotenv/config"
import express from "express"

import loaders from "../src/loaders/index"

// importação de rotas
import usuario from "../src/routes/usuario"
import servico from "../src/routes/servico"
import agendamento from "../src/routes/agendamento"
import horario from "../src/routes/horario"
import colaborador from "../src/routes/colaborador"
import cors from "cors"

// configurações
const app = express()
app.use(express.json())
app.use(cors())

// conectar banco de dados
loaders.startDB()

// rotas
app.use("/api/usuario", usuario)
app.use("/api/colaborador", colaborador)
app.use("/api/servico", servico)
app.use("/api/agendamento", agendamento)
app.use("/api/horario", horario)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`http://localhost:${porta}`))
