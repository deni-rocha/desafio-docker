import { Request, Response } from "express"
import Servico, { IServico } from "../models/Servico"

const servico = {
  novo: async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, preco }: IServico = req.body

    if (nome.length < 4)
      res.status(202).send({ msg: "por favor preencha os dados" })
    try {
      await Servico.create({
        nome,
        descricao,
        preco,
      })
      // HTTP Status 201: Created
      res.status(201).end()
    } catch (erro) {
      console.log(erro)
      // HTTP 500: Internal Server Error
      res.status(500).send(erro)
    }
  },
  listar: async function (_req: Request, res: Response): Promise<void> {
    try {
      const lista = await Servico.find()
      res.send(lista) // HTTP 200 implícito
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
}

export default servico
