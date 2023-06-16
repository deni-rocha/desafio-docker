import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

// libera acesso de usuários e colaboradores
function verifyTokenAny(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      msg: "Acesso negado!",
    })
  }

  const secretUsuario = process.env.SECRET_USUARIO
  const secretColaborador = process.env.SECRET_COLABORADOR

  const isUserToken: unknown = verify(token, secretUsuario, function (err) {
    // se houver erro retorna false
    if (err) return false

    return true
  })

  const isColaboradorToken: unknown = verify(
    token,
    secretColaborador,
    function (err) {
      // se houver erro retorna false
      if (err) return false

      return true
    },
  )

  if (isUserToken || isColaboradorToken) {
    next()

    return
  }

  return res.status(400).json({ msg: "Token inválido!" })
}

export default verifyTokenAny
