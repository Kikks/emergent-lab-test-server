import { DataSource } from 'typeorm'

import { Employee } from './entity/Employee'
import { User } from './entity/User'

const env = process.env.NODE_ENV || 'development'

const environmentConfig: {
  [key: string]: {
    username: string | undefined
    password: string | undefined
    database: string | undefined
    host: string
  }
} = {
  development: {
    username: process.env.DEVELOPMENT_USERNAME,
    password: process.env.DEVELOPMENT_PASSWORD,
    database: process.env.DEVELOPMENT_DB,
    host: '127.0.0.1',
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: '127.0.0.1',
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DB,
    host: '127.0.0.1',
  },
}

const AppDataSource = new DataSource({
  type: 'mysql',
  host: environmentConfig[env].host,
  username: environmentConfig[env].username,
  password: environmentConfig[env].password,
  database: environmentConfig[env].database,
  synchronize: true,
  logging: false,
  entities: [Employee, User],
  migrations: [],
  subscribers: [],
})

const dataSource = AppDataSource.createQueryBuilder()

export { AppDataSource, dataSource }
