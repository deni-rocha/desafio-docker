import { Request, Response } from "express"
import Agendamento, { IAgendamento } from "../models/Agendamento"

const agendamento = {
  novo: async (req: Request, res: Response): Promise<void> => {
    const { servico, usuario }: IAgendamento = req.body

    try {
      await Agendamento.create({
        data: new Date(),
        servico,
        usuario,
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
    // if(Object.keys(req.query).length > 0) { // Se houver query string
    //    busca(req, res)
    // }
    // sem query string
    try {
      // find(), sem parâmetros, retorna todos
      // O parâmetro de populate() é o *ATRIBUTO* relacionado
      const lista = await Agendamento.find()
        .populate("usuario")
        .populate("servico")
      res.send(lista) // HTTP 200 implícito
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
}

export default agendamento
