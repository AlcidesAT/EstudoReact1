import { Container, Service } from 'typedi'
import http from 'http'
import sequelize from './infra/sequelize'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import corsValidation from './utils/cors-validation'
import { buildSchemaSync } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import { ENVIRONMENT, IS_DEV, PORT } from './config'
import { expressMiddleware } from '@apollo/server/express4'
import { useContainer, useExpressServer } from 'routing-controllers'
import { MoviesResolver } from './graphql/resolvers/movies-resolver'

@Service()
export class ExpressServer {

  public server: http.Server

  constructor() {
    void this.createServer()
  }

  async testConnection(): Promise<void> {
    try {
      await sequelize.authenticate()
      console.log('Successfully connected to the database')
    } catch (err) {
      console.log('Error connecting to the database!', err)
    }
  }

  async createServer(): Promise<void> {
    await this.testConnection()

    const app = express()

    app.use(
      compression(),
      cors({ origin: corsValidation }),
      bodyParser.json({ limit: 2000000 }),
      bodyParser.urlencoded({ extended: true })
    )

    const schema = buildSchemaSync({
      validate: { forbidUnknownValues: false },
      resolvers: [ MoviesResolver ],
      container: Container
    })

    const graphqlMiddleware = new ApolloServer({
      schema,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [ {
        async requestDidStart(requestContext) {
          if (IS_DEV || ENVIRONMENT == 'develop') {
            console.log(`Graphql Operation Name = ${ requestContext.request.operationName } ${ JSON.stringify(requestContext.request.variables) }`)
          }
        }
      } ],
      introspection: true
    })

    await graphqlMiddleware.start()

    app.use('/graphql', expressMiddleware(graphqlMiddleware))

    useContainer(Container)

    useExpressServer(app, {
      defaultErrorHandler: true,
      controllers: []
    })

    this.server = app.listen(PORT, () => {
      console.log(`Server listening on port: ${ PORT }`)
    })

  }
}
