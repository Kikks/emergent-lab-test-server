import { DataSource } from 'typeorm'

import { Employee } from './entity/Employee'
import { User } from './entity/User'

const env = process.env.NODE_ENV || 'development'

const environmentConfig: {
  [key: string]: {
    username: string | undefined
    password: string | undefined
    database: string | undefined
    host: string | undefined
    port: string | undefined
  }
} = {
  development: {
    username: process.env.DEVELOPMENT_USERNAME,
    password: process.env.DEVELOPMENT_PASSWORD,
    database: process.env.DEVELOPMENT_DB,
    host: process.env.DEVELOPMENT_HOST,
    port: process.env.DEVELOPMENT_PORT,
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.TEST_HOST,
    port: process.env.TEST_PORT,
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DB,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
  },
}

const AppDataSource =
  env === 'production'
    ? new DataSource({
        type: 'mysql',
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: false,
        entities: [Employee, User],
        migrations: [],
        subscribers: [],
      })
    : new DataSource({
        type: 'mysql',
        port: environmentConfig[env].port ? Number(environmentConfig[env].port) : undefined,
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
