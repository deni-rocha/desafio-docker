import "dotenv/config"
import express from "express"

import { loaders } from "../src/loaders/index"

import cors from "cors"

// importação de rotas
import aluno from "../src/routes/aluno"

// configurações
const app = express()
app.use(express.json())
app.use(cors())

// conectar banco de dados
loaders.connect()

// rotas
app.use("/api/aluno", aluno)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`http://localhost:${porta}`))
