import mysql, { Connection } from "mysql2"

export const loaders = {
  connect: (): Connection => {
    // verifica se já existe uma conexão
    const verifyConnectionExist = (): boolean =>
      global.connection.connect((err: unknown) => {
        if (err) return false

        return true
      })

    if (global.connection && verifyConnectionExist()) {
      return global.connection
    }

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_USER_PASSWORD,
    })

    // cria uma tabela no banco de dados, apenas se essa tabela não existir
    const createTableAlunos =
      "CREATE TABLE IF NOT EXISTS Alunos (ID int NOT NULL AUTO_INCREMENT, nome VARCHAR(255), idade int, notaSemestre1 float, notaSemestre2 float, professor VARCHAR(255), salaNumero int, PRIMARY KEY (ID))"

    connection.query(createTableAlunos)

    return (global.connection = connection)
  },
}
