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

    const connection = mysql.createConnection(process.env.DATABASE_URL)

    return (global.connection = connection)
  },
}
