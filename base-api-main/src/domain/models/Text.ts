import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@ObjectType()
@Table({ modelName: 'text', tableName: 'texts' })
export class Text extends Model {

  @Field(() => ID)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: string

  @Field(() => String)
  @Column({ type: DataTypes.STRING })
  declare title: string
}