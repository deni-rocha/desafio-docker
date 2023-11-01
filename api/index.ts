import "dotenv/config"
import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

import { loaders } from "../src/loaders/index"
import swaggerDocument from "../swagger.json"

// importação de rotas
import aluno from "../src/routes/aluno"

// configurações
const app = express()
app.use(express.json())
app.use(cors())

// conectar banco de dados
loaders.connect()

// rotas
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/aluno", aluno)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`http://localhost:${porta}`))
