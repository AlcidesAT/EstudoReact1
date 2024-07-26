import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Table, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { File, FileInput } from '../../graphql/models/schema'

@ObjectType()
@Table({ modelName: 'movie', tableName: 'movies' })
export class Movie extends Model {

  @Field(() => ID)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: string

  @Field(() => String)
  @Column({ type: DataTypes.STRING })
  declare title: string

  @Field(() => Number)
  @Column({ type: DataTypes.FLOAT })
  declare year: number

  @Field(() => String)
  @Column({ type: DataTypes.STRING })
  declare description: string

  @Field(() => File, { nullable: true })
  @Column({ type: DataTypes.JSON })
  declare image: FileInput | null

  @Field(() => String)
  @Column({ type: DataTypes.STRING })
  declare type: string

  @Field(() => String)
  @Column({ type: DataTypes.STRING })
  declare genre: string

}
