import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { IUser } from '../interfaces/user.intf'
import { constants } from '../lib/constants'
import EmergentLabError from '../lib/error'
import { failure, success } from '../lib/response'
import { generateToken } from '../lib/token'
import { createUser, getUser } from '../services/user'

const { SUCCESSFUL } = constants

const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await getUser({
      email,
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new EmergentLabError('User does not exist or invalid login details.', 404)
    }

    const userData = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    }

    return success({
      res,
      data: {
        user: userData,
        token: generateToken(userData),
      },
      message: SUCCESSFUL,
      httpCode: 200,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error?.message || 'Error loggin in.',
      errStack: error?.stack,
      httpCode: error?.code || 500,
    })
  }
}

const handleRegister = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password }: IUser = req.body
    await createUser({
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, 12),
    })

    return success({
      res,
      data: 'User created succesfully',
      message: SUCCESSFUL,
      httpCode: 201,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error.message || 'Error registering user',
      errStack: error.stack,
      httpCode: error.code || 500,
    })
  }
}

export { handleLogin, handleRegister }
