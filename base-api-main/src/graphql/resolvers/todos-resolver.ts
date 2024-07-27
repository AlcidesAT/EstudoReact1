import { Todo } from '../../domain/models/Todo';
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";

@Service()
@Resolver(Todo)

export class TodosResolver{

    @Query(( )=> [Todo])
    async todos(): Promise<Todo[]>{
    return await Todo.findAll()
    }
}