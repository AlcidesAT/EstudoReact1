import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class FileInput {
  @Field(() => String)
  name: string
  @Field(() => String)
  url: string
}

@ObjectType()
export class File {
  @Field(() => String, { nullable: true })
  name: string
  @Field(() => String)
  url: string

  constructor(url: string, name: string) {
    this.url = url
    this.name = name
  }
}
