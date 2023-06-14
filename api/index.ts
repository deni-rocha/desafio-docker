import "dotenv/config"
import express from "express"
import verificarToken from "./middlewares/verificarToken/index"
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
app.use("/api/usuario", verificarToken, usuario)
app.use("/api/colaborador", verificarToken, colaborador)
app.use("/api/servico", verificarToken, servico)
app.use("/api/agendamento", verificarToken, agendamento)
app.use("/api/horario", verificarToken, horario)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`http://localhost:${porta}`))
