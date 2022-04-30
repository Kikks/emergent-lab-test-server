import { AppDataSource } from '../../db'
import { User } from '../../db/entity/User'
import { IUser } from '../interfaces/user.intf'
import EmergentLabError from '../lib/error'

const getUser = ({ email }: { email: any }) => {
  const user = AppDataSource.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.email = :email', { email })
    .getOne()

  return user
}

const createUser = async ({ email, firstName, lastName, password }: IUser) => {
  const existingUser = await AppDataSource.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.email = :email', { email })
    .getOne()

  if (existingUser) {
    throw new EmergentLabError('A user with that email already exists.', 400)
  }

  return AppDataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password,
    })
    .execute()
}

export { getUser, createUser }
