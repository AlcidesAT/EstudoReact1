import { Field, ID, ObjectType } from 'type-graphql'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Todo } from '../../domain/models/Todo'
import { Text } from '../../domain/models/Text'

@ObjectType()
@Table({ modelName: 'todoText', tableName: 'todo_texts' })
export class TodoText extends Model {

  @Field(() => ID)
  @Column({ type: DataTypes.INTEGER, primaryKey: true})
  @ForeignKey (()=> Todo)
  declare todoId: string

  @Field(() => ID)
  @Column({ type: DataTypes.STRING, primaryKey: true })
  @ForeignKey(() => Text)
  declare textId: string

  @BelongsTo(() => Todo)
  todo!: Todo;

  @BelongsTo(() => Text)
  text!: Text;
}
