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

import { QueryError, ResultSetHeader } from "mysql2"
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

    if (!nome) {
      res.status(400).send({ message: "necessário informar o nome" })
      return
    }

    const queryCreate = `INSERT INTO Alunos (nome, idade, notaSemestre1, notaSemestre2, professor, salaNumero) VALUES ('${nome}', '${idade}', '${notaSemestre1}', '${notaSemestre2}', '${professor}', '${salaNumero}')`

    global.connection.query(
      queryCreate,
      function (err: QueryError, results: ResultSetHeader) {
        if (err) throw err

        res
          .status(201)
          .send({ message: "criado com sucesso", id: results.insertId })
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

  getById: (req: Request, res: Response): void => {
    const id = req.params.id

    const query = `SELECT * FROM Alunos WHERE ID = ${id}`

    global.connection.query(
      query,
      (_err: QueryError, result: Aluno[]): void => {
        if (result.length === 0) {
          res.status(204).send({ message: "Nenhum aluno foi encontrado" })
          return
        }

        res.status(200).send(result)
      },
    )
  },
  update: (req: Request, res: Response): void => {
    interface AlunoUpdate extends Aluno {
      id: string
    }

    const {
      id,
      nome,
      idade,
      notaSemestre1,
      notaSemestre2,
      professor,
      salaNumero,
    }: AlunoUpdate = req.body

    const query = `UPDATE Alunos SET nome = '${nome}', idade = '${idade}' , notaSemestre1 = '${notaSemestre1}', notaSemestre2 = '${notaSemestre2}', professor = '${professor}', salaNumero = '${salaNumero}'  WHERE ID = ${id}`

    global.connection.query(query, (err: QueryError, results: unknown) => {
      if (err) {
        console.log(err)
        res.status(400).send({
          message: "os requisitos não foram cumpridos, verifique os campos",
        })
        return
      }

      res.status(200).send(results)
    })
  },
  delete: (req: Request, res: Response): void => {
    const id = req.params.id

    const query = `DELETE FROM Alunos WHERE ID = ${id}`

    global.connection.query(
      query,
      (err: QueryError, result: ResultSetHeader): void => {
        if (err) {
          res.status(500).send("erro inesperado")
          return
        }

        if (result.affectedRows === 0) {
          res
            .status(204)
            .send({ message: "Nenhum aluno foi encontrado, verifique o ID" })
          return
        }

        res.status(200).send({ message: "aluno deletado com sucesso" })
      },
    )
  },

  // deleteTable: (_req: Request, res: Response): void => {
  //   const queryGetAll = "DROP TABLE Alunos"
  //   global.connection.query(
  //     queryGetAll,
  //     (err: QueryError, results: unknown) => {
  //       if (err) throw err

  //       res.json(results)
  //     },
  //   )
  // },
  // createTable: (_req: Request, res: Response): void => {
  //   const createTableAlunos =
  //     "CREATE TABLE Alunos (ID int NOT NULL AUTO_INCREMENT, nome VARCHAR(255), idade int, notaSemestre1 float, notaSemestre2 float, professor VARCHAR(255), salaNumero int, PRIMARY KEY (ID))"

  //   global.connection.query(
  //     createTableAlunos,
  //     (err: QueryError, results: unknown) => {
  //       if (err) throw err

  //       res.json(results)
  //     },
  //   )
  // },
}
