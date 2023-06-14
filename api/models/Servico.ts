import { model, Schema } from "mongoose"

export interface IServico {
  nome: string
  descricao: string
  preco: number
  duracao: number
  colaboradores: [Schema.Types.ObjectId]
  status: string
}

const servicoSchema = new Schema<IServico>({
  nome: { type: String, required: true, minlength: 4 },
  descricao: { type: String, default: "sem descrição" },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true },
  colaboradores: [{ type: Schema.Types.ObjectId, ref: "Colaborador" }],
  status: {
    type: String,
    enum: ["A", "I", "E"],
    default: "A",
    required: true,
  },
})

const Servico = model<IServico>("Servico", servicoSchema)

export default Servico
