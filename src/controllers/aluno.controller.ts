// cria tabela de alunos
// ID, nome, idade,
// nota do primeiro semestre,
// nota do segundo semestre,
// nome do professor e número da sala.
// const createTableAlunos = "CREATE TABLE Alunos (ID int NOT NULL AUTO_INCREMENT, nome VARCHAR(255), idade VARCHAR(255), nota_1semestre VARCHAR(255), nota_2semestre VARCHAR(255), professor_nome VARCHAR(255), sala_numero VARCHAR(255), PRIMARY KEY (ID))";

// // criação da tabela alunos
// connection.query(createTableAlunos, function (_err, results, fields) {
//     console.log(results) // results contains rows returned by server
//     console.log(fields) // fields contains extra metadata about results, if available
// })

// const insertAluno = "INSERT INTO Alunos (nome, idade, nota_1semestre, nota_2semestre, professor_nome, sala_numero) VALUES ('Denilson', '23', '9.5', '10.0', 'Felipe Pascoal', '3' )";
// connection.query(insertAluno, function (err, results) {
//     if (err) throw err;
//     console.log("1 record inserted", results);
// })

// connection.query("SELECT * FROM Alunos", (_err, res) => { console.log(res) })

// connection.end()

import { QueryError, QueryOptions } from "mysql2"
import { Request, Response } from "express"

import { Aluno } from "../models/Aluno"

export const aluno = {
  create: (req: Request, res: Response): void => {
    const {
      nome,
      idade,
      notaSemestre1,
      notaSemestre2,
      professor,
      salaNumero,
    }: Aluno = req.body

    console.log(req)
    if (!nome) {
      res.status(400).send({ msg: "necessário informar o nome" })
      return
    }

    const queryCreate = `INSERT INTO Alunos (nome, idade, notaSemestre1, notaSemestre2, professor, salaNumero) VALUES ('${nome}', '${idade}', '${notaSemestre1}', '${notaSemestre2}', '${professor}', '${salaNumero}')`

    global.connection.query(
      queryCreate,
      function (err: QueryError, results: QueryOptions) {
        if (err) throw err

        console.log(results)
        res.status(201).send({ message: "criado com sucesso", data: results })
      },
    )
  },

  getAll: (_req: Request, res: Response): void => {
    const queryGetAll = "SELECT * FROM Alunos"
    global.connection.query(
      queryGetAll,
      (err: QueryError, results: Aluno[]) => {
        if (err) throw err

        const listAlunos = results

        res.send(listAlunos)
      },
    )
  },
  deleteTable: (_req: Request, res: Response): void => {
    const queryGetAll = "DROP TABLE Alunos"
    global.connection.query(
      queryGetAll,
      (err: QueryError, results: unknown) => {
        if (err) throw err

        res.json(results)
      },
    )
  },
  createTable: (_req: Request, res: Response): void => {
    const createTableAlunos =
      "CREATE TABLE Alunos (ID int NOT NULL AUTO_INCREMENT, nome VARCHAR(255), idade int, notaSemestre1 float, notaSemestre2 float, professor VARCHAR(255), salaNumero int, PRIMARY KEY (ID))"

    global.connection.query(
      createTableAlunos,
      (err: QueryError, results: unknown) => {
        if (err) throw err

        res.json(results)
      },
    )
  },
}
