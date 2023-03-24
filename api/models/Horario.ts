import { model, Schema } from "mongoose"

export interface IHorario {
  dias: [string]
  horarios: [string]
}

const horarioSchema = new Schema<IHorario>(
  {
    dias: { type: [String], required: true },
    horarios: { type: [String], required: true },
  },
  { timestamps: true },
)

const Horario = model<IHorario>("Horario", horarioSchema)

export default Horario
