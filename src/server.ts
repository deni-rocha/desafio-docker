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

// para o funcionamento do swagger na Vercel
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

// conectar banco de dados
loaders.connect()

// rotas
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }),
)

app.use("/aluno", aluno)

// servidor
const porta = process.env.PORT || 3030
app.listen(porta, () => console.log(`porta:${porta}`))
