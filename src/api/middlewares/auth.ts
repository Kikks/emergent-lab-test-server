import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { failure } from '../lib/response'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]

    try {
      const user = jwt.verify(token, process.env.SECRET_KEY as string)

      res.locals.user = user
      return next()
    } catch (error) {
      return failure({
        message: 'Invalid/Expired Token.',
        httpCode: 403,
        res,
      })
    }
  } else {
    return failure({
      message: 'Authentication header must be provided.',
      httpCode: 403,
      res,
    })
  }
}

export { checkAuth }
