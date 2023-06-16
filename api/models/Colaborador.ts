import { model, Schema } from "mongoose"

export interface IColaborador {
  nome: string
  email: string
  senha: string
  permissao: string
  foto: string
  sexo: string
  horario: Schema.Types.ObjectId
  dataDeNascimento: string
}

const funcionarioSchema = new Schema<IColaborador>({
  nome: { type: String, required: true, minlength: 4 },
  senha: { type: String, required: true },
  email: { type: String, required: true },
  sexo: { type: String, enum: ["M", "F"] },
  horario: { type: Schema.Types.ObjectId },
  foto: { type: String, required: true, default: "" },
  dataDeNascimento: { type: String, required: true },
  permissao: { type: String, enum: ["NORMAL", "ADMIN"], required: true },
})

const User = model<IColaborador>("Colaborador", funcionarioSchema)

export default User
