import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { DATABASE_URL } from '../config'
import { Movie } from '../domain/models/Movie'

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  models: [ Movie ],
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true
  },
  dialectOptions: {
    application_name: 'Movie API'
  },
  logging: msg => console.log(msg)
}

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)
export default sequelize
