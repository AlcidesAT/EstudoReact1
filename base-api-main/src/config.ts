import * as process from 'process'
import { config } from 'dotenv'

config()
if (config().error) {
  console.error('Missing .env file.')
  throw new Error('Missing env file')
}
export const DATABASE_URL = process.env.DATABASE_URL || ''
export const ENVIRONMENT = process.env.NODE_ENV || 'development'
export const IS_DEV = ENVIRONMENT === 'development'
export const PORT = process.env.PORT || 5000
