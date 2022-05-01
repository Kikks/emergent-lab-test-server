import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import { Role } from '../../types/Roles'
import { IEmployee } from '../interfaces/employee.intf'
import { failure } from '../lib/response'

const returnFailure = (error: string, res: Response) => {
  return failure({
    res,
    message: error,
    httpCode: 400,
  })
}

const validateEmployeeData = (req: Request, res: Response, next: NextFunction) => {
  if (_.isEmpty(req.body)) {
    return returnFailure('Empty request body', res)
  }

  const { email, firstName, lastName, phoneNumber, role }: IEmployee = req.body

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

  if (!phoneNumber || phoneNumber.trim() === '') {
    return returnFailure('Phone number must not be empty', res)
  }

  const roles: Role[] = ['admin', 'staff']
  if (!role || role.trim() === '') {
    return returnFailure('Role must not be empty', res)
  } else if (!roles.includes(role)) {
    return returnFailure('Invalid Role supllied', res)
  }

  return next()
}

export { validateEmployeeData }
