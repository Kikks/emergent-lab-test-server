import { NextFunction, Request, Response } from 'express'
import { isEmpty } from 'lodash/fp'

import { IUser } from '../interfaces/user.intf'
import { failure } from '../lib/response'

const returnFailure = (error: string, res: Response) => {
  return failure({
    res,
    message: error,
    httpCode: 400,
  })
}

const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  if (isEmpty(req.body)) {
    return returnFailure('Empty request body', res)
  }

  const { email, password }: IUser = req.body

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email || email.trim() === '') {
    return returnFailure('Email must not be empty', res)
  } else if (!email.match(regex)) {
    return returnFailure('Invalid Email supplied', res)
  }

  if (!password || password.trim() === '') {
    return returnFailure('Password must not be empty', res)
  }

  return next()
}

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  if (isEmpty(req.body)) {
    return returnFailure('Empty request body', res)
  }

  const { email, firstName, lastName, password }: IUser = req.body

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email || email.trim() === '') {
    return returnFailure('Email must not be empty', res)
  } else if (!email.match(regex)) {
    return returnFailure('Invalid Email supplied', res)
  }

  if (!firstName || firstName.trim() === '') {
    return returnFailure('First Name must not be empty', res)
  }

  if (!lastName || lastName.trim() === '') {
    return returnFailure('Last Name must not be empty', res)
  }

  if (!password || password.trim() === '') {
    return returnFailure('Password must not be empty', res)
  } else if (password.length < 8) {
    return returnFailure('Password must not be less thatn 8 characters', res)
  }

  return next()
}

export { validateUserData, validateLoginData }
