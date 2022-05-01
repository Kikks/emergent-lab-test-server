import 'reflect-metadata'

import bluebird from 'bluebird'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import { corsWhitelist } from './api/lib/constants'
import { routes } from './api/routes'
import { logger } from './config/winston'

export class EmergentLabAPI {
  readonly server: Application

  public constructor() {
    this.server = express()
    this.server.use(
      cors({
        origin: corsWhitelist,
      })
    )
    this.server.use(morgan('combined', { stream: logger.stream }))
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({ extended: true }))

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Authorization, Content-Type, Accept, x-auth-token'
      )
      next()
    })

    this.routes()

    this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
      err.status = 404
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
      next(err)
    })
  }

  public async init() {
    return new EmergentLabAPI()
  }

  public routes(app?: Application) {
    ;(global as any).Promise = bluebird as any
    routes(app || this.server)
  }

  get app() {
    if (!this.server) {
      this.init()
    }
    return this.server
  }
}
