import { Request, Response } from "express"
import Agendamento from "../models/Agendamento"

const agendamento = {
  criar: async (req: Request, res: Response): Promise<void> => {
    const { data, servico, usuario } = req.body

    // verificar se já existe agendamento marcado para esse horário
    const existeAgendamento = await Agendamento.findOne({ data })

    if (existeAgendamento) {
      console.log(existeAgendamento)
      res.status(400).send({ msg: "agendamento já existente" })
      return
    }
    try {
      await Agendamento.create({
        servico,
        usuario,
        data,
      })
      // HTTP Status 201: Created
      res.status(201).end()
    } catch (erro) {
      console.log(erro)
      // HTTP 500: Internal Server Error
      res.status(500).send(erro)
    }
  },
  listar: async function (req: Request, res: Response): Promise<void> {
    if (Object.keys(req.query).length > 0) {
      // Se houver query string
      busca(req, res)
    }
    // sem query string
    try {
      // find(), sem parâmetros, retorna todos
      // O parâmetro de populate() é o *ATRIBUTO* relacionado
      const lista = await Agendamento.find({})
        .populate("usuario")
        .populate("servico")

      res.send(lista) // HTTP 200 implícito
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
  obterUm: async function (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const obj = await Agendamento.findById(id)
      if (obj) {
        // obj foi encontrado
        res.send(obj) // HTTP 200
      } else {
        // HTTP 404: Not found
        res.status(404).end()
      }
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
  atualizar: async function (req: Request, res: Response): Promise<void> {
    try {
      const id = req.body._id
      const obj = await Agendamento.findByIdAndUpdate(id, req.body)
      if (obj) {
        // obj foi encontrado e atualizado
        // HTTP 204: No content
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
  excluir: async function (req: Request, res: Response): Promise<void> {
    try {
      const id = req.body._id
      const obj = await Agendamento.findByIdAndDelete(id)
      if (obj) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
}

async function busca(req: Request, res: Response): Promise<void> {
  const atrib = Object.keys(req.query)[0]
  const valor = Object.values(req.query)[0]

  try {
    const lista = await Agendamento.find({ [atrib]: valor })
      .populate("usuario")
      .populate("servico")
    res.send(lista)
  } catch (erro) {
    console.log(erro)
    res.status(500).end()
  }
}

export default agendamento
