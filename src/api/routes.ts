import '../../setup/envConfig'

import * as express from 'express'

import {
  handleAddEmployee,
  handleDeleteEmployee,
  handleGetEmployees,
  handleUpdateEmployee,
} from './contollers/employees.ctrl'
import { handleLogin, handleRegister } from './contollers/user.ctrl'
import { checkAuth } from './middlewares/auth'
import { validateEmployeeData } from './validators/employees.vld'
import { validateLoginData, validateUserData } from './validators/user.vld'

const routes = (app: express.Router) => {
  app.get('/', (req: express.Request, res: express.Response) =>
    res.status(200).json({ message: 'ok' })
  )

  app.post('/user', validateUserData, handleRegister)
  app.post('/user/login', validateLoginData, handleLogin)

  app.get('/employee', checkAuth, handleGetEmployees)
  app.post('/employee', checkAuth, validateEmployeeData, handleAddEmployee)
  app.patch('/employee/:id', checkAuth, validateEmployeeData, handleUpdateEmployee)
  app.delete('/employee/:id', checkAuth, handleDeleteEmployee)

  return app
}

export { routes }
