import 'reflect-metadata'
import sequelize from './infra/sequelize'
import { ExpressServer } from './express-server'

const express = new ExpressServer()

process.on('SIGINT', () => {
  const cleanUp = async () => {
    await sequelize.close()
    console.log('Database connections closed.')
  }
  console.log('Closing server...')
  try {
    express.server.close(() => {
      console.log('Server closed !!! ')
      void cleanUp().then(() => process.exit())
    })
  } catch (e: any) {
    void cleanUp().then(() => process.exit())
  }
})
