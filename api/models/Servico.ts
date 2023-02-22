import { model, Schema } from "mongoose"

export interface IServico {
  nome: string
  descricao: string
  preco: number
}

const servicoSchema = new Schema<IServico>({
  nome: { type: String, required: true, minlength: 4 },
  descricao: { type: String, default: "sem descrição" },
  preco: { type: Number, required: true },
})

const Servico = model<IServico>("Servico", servicoSchema)

export default Servico
