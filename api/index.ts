import "dotenv/config"
import express from "express"
import loaders from "./loaders/index"

// importação de rotas
import usuario from "./routes/usuario"
import servico from "./routes/servico"
import agendamento from "./routes/agendamento"
import horario from "./routes/horario"
import colaborador from "./routes/colaborador"

// configurações
const app = express()
app.use(express.json())

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
