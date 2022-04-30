import { Request, Response } from 'express'

import { IEmployee } from '../interfaces/employee.intf'
import { constants } from '../lib/constants'
import { failure, success } from '../lib/response'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../services/employees'

const { SUCCESSFUL } = constants

const handleGetEmployees = async (req: Request, res: Response) => {
  try {
    const { search, page, limit } = req.query
    const data = await getEmployees({
      search,
      page,
      limit,
    })

    return success({
      res,
      data: {
        employees: data[0],
        page,
        total: data[1],
      },
      message: SUCCESSFUL,
      httpCode: 200,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error?.message || 'Error fetching employess.',
      errStack: error?.stack,
      httpCode: error?.code || 500,
    })
  }
}

const handleAddEmployee = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, phoneNumber, role }: IEmployee = req.body
    await createEmployee({
      email,
      firstName,
      lastName,
      phoneNumber,
      role,
    })

    return success({
      res,
      data: 'Employee created succesfully',
      message: SUCCESSFUL,
      httpCode: 201,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error.message || 'Error adding employee',
      errStack: error.stack,
      httpCode: error.code || 500,
    })
  }
}

const handleUpdateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { email, firstName, lastName, phoneNumber, role }: IEmployee = req.body
    await updateEmployee({
      id,
      data: { email, firstName, lastName, phoneNumber, role },
    })

    return success({
      res,
      data: 'Employee updated successfuly.',
      message: SUCCESSFUL,
      httpCode: 200,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error.message || 'Error updating employee',
      errStack: error.stack,
      httpCode: error.code || 500,
    })
  }
}

const handleDeleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteEmployee({
      id,
    })

    return success({
      res,
      data: 'Employee deleted successfuly.',
      message: SUCCESSFUL,
      httpCode: 200,
    })
  } catch (error: any) {
    return failure({
      res,
      message: error.message || 'Error deleting employee',
      errStack: error.stack,
      httpCode: error.code || 500,
    })
  }
}

export { handleGetEmployees, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee }
