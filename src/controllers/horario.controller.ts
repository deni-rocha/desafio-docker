import { Request, Response } from "express"
import Agendamento from "../models/Agendamento"
import Horario from "../models/Horario"
import { hourToMinutes, sliceMinutes } from "../util/index"

const horario = {
  criar: async (req: Request, res: Response): Promise<void> => {
    const { dias, inicio, fim } = req.body

    const horarios = sliceMinutes(inicio, fim)

    const existeHorario = await Horario.find()

    if (existeHorario.length) {
      res.status(400).send({ message: "já existem horários cadastrados" })
      return
    }

    try {
      await Horario.create({
        dias,
        horarios,
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
      const lista = await Horario.find({})
      res.send(lista) // HTTP 200 implícito
    } catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
    }
  },
  obterUm: async function (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const obj = await Horario.findById(id)
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
      const obj = await Horario.findByIdAndUpdate(id, req.body)
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
      const obj = await Horario.findOneAndDelete(id)
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
  datasDisponiveis: async (_req: Request, res: Response): Promise<void> => {
    // é preciso pegar o time zone correto, pois o servido atual da aplicação está no exterior
    const timeZoneData = { timeZone: "America/Sao_Paulo" }

    // armazena data atual
    const dataAtual = new Date()

    // transforma data atual em uma string, formato pt-br dd/mm/yyyy
    const dataAtualFixa = dataAtual.toLocaleDateString("pt-br", {
      ...timeZoneData,
    })

    // obtém o horario atual, formato 00:00
    const dataAtualFixaHora = dataAtual.toLocaleTimeString("pt-br", {
      hour: "numeric",
      minute: "numeric",
      ...timeZoneData,
    })

    // agenda que terá os próximos 7 dias com seus respectivos horários disponiveis
    const agenda = [{}]
    const quantidadeDia = 7

    // obtém os horarios cadastrados no banco
    const horario = await Horario.findOne()

    // verificar se já existe agendamento marcado para esse horário
    const existeAgendamento = await Agendamento.find({
      data: { $gte: dataAtual },
    })

    while (agenda.length <= quantidadeDia) {
      let horariosDoDia: string[] = []
      const weekdayName = dataAtual.toLocaleDateString("pt-br", {
        weekday: "long",
        ...timeZoneData,
      })

      // verifica se o dia da semana está cadastrado
      const diaIncluso = horario?.dias.includes(weekdayName)

      if (diaIncluso) {
        const opcoesFormato: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }
        const dateFormatEn = dataAtual.toLocaleDateString("en", opcoesFormato)

        const dateFormatPtBr = dataAtual.toLocaleDateString("pt-br", {
          ...opcoesFormato,
          ...timeZoneData,
        })

        existeAgendamento.forEach((objAgendamento) => {
          const dateAgendamentoEn = objAgendamento.data.toLocaleDateString(
            "en",
            opcoesFormato,
          )

          if (dateAgendamentoEn === dateFormatEn) {
            const dateAgendamentoHour = objAgendamento.data.toLocaleTimeString(
              "pt-br",
              { hour: "numeric", minute: "numeric" },
            )

            horario?.horarios.forEach((h) => {
              // para evitar o duplicamento das horas no array
              if (horariosDoDia.length === horario.horarios.length) {
                const novoHorariosDoDia = horariosDoDia.map((hora) =>
                  hora === dateAgendamentoHour ? "-" : hora,
                )
                horariosDoDia = novoHorariosDoDia
              } else {
                h !== dateAgendamentoHour
                  ? horariosDoDia.push(h)
                  : horariosDoDia.push("-")
              }
            })
          }
        })

        const listaHorarios = horariosDoDia.length
          ? horariosDoDia
          : horario?.horarios

        agenda.push({
          [dateFormatPtBr]: listaHorarios,
        })
      }

      dataAtual.setHours(24)
    }

    const updateAgenda = agenda.map((obj) => {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(dataAtualFixa)) {
        return {
          [dataAtualFixa]: obj[dataAtualFixa].map((h: string) => {
            const horaInt = hourToMinutes(h)
            const horaAtualInt = hourToMinutes(dataAtualFixaHora)
            return horaInt <= horaAtualInt ? "-" : h
          }),
        }
      }

      return obj
    })

    // remove o primeiro elemento do array que neste caso é um objeto vazio
    updateAgenda.shift()

    res.send(updateAgenda)
  },
}

export default horario
