import { AppDataSource } from '../../db'
import { Employee } from '../../db/entity/Employee'
import { IEmployee } from '../interfaces/employee.intf'
import EmergentLabError from '../lib/error'

const getEmployees = ({ search, page, limit }: { search: any; page: any; limit: any }) => {
  const employees = AppDataSource.createQueryBuilder()
    .select('employee')
    .from(Employee, 'employee')
    .where('employee.fullName like :search', { search: `%${search || ''}%` })
    .orWhere('employee.email like :search', { search: `%${search || ''}%` })
    .orWhere('employee.phoneNumber like :search', { search: `%${search || ''}%` })
    .skip(page && Number(page) !== NaN ? (Number(page) < 0 ? undefined : Number(page)) : undefined)
    .take(limit && Number(limit) !== NaN ? Number(limit) : undefined)
    .getManyAndCount()

  return employees
}

const createEmployee = async ({ email, firstName, lastName, phoneNumber, role }: IEmployee) => {
  const existingEmployee = await AppDataSource.createQueryBuilder()
    .select('employee')
    .from(Employee, 'employee')
    .where('employee.email = :email', { email })
    .getOne()

  if (existingEmployee) {
    throw new EmergentLabError('A employee with that email already exists.', 400)
  }

  return AppDataSource.createQueryBuilder()
    .insert()
    .into(Employee)
    .values({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phoneNumber,
      role,
    })
    .execute()
}

const updateEmployee = async ({
  id,
  data: { email, firstName, lastName, phoneNumber, role },
}: {
  id: any
  data: IEmployee
}) => {
  const existingEmployee = await AppDataSource.createQueryBuilder()
    .select('employee')
    .from(Employee, 'employee')
    .where('employee.id = :id', { id })
    .getOne()

  if (!existingEmployee) {
    throw new EmergentLabError(`No employee with id: "${id}" exists.`, 404)
  }

  return AppDataSource.createQueryBuilder()
    .update(Employee)
    .set({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phoneNumber,
      role,
    })
    .where('id = :id', { id })
    .execute()
}

const deleteEmployee = async ({ id }: { id: any }) => {
  const existingEmployee = await AppDataSource.createQueryBuilder()
    .select('employee')
    .from(Employee, 'employee')
    .where('employee.id = :id', { id })
    .getOne()

  if (!existingEmployee) {
    throw new EmergentLabError(`No employee with id: "${id}" exists.`, 404)
  }

  return AppDataSource.createQueryBuilder()
    .delete()
    .from(Employee)
    .where('id = :id', { id })
    .execute()
}
export { getEmployees, createEmployee, updateEmployee, deleteEmployee }
