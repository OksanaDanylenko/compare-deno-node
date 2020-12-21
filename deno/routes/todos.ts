import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
    id?: string,
    text: string,
}

router.get('/todos', async (ctx)=>{
   const todos = await getDb().collection('todos').find();//{_id}
    const transformedTodos: any = todos.map(
        (todo: any) => {
            return { id: todo._id.$oid, text: todo.text };
        }
    );
    ctx.response.body = {
        todos: transformedTodos
    };//auto json
});

router.post('/todos', async (ctx)=>{
    const { value } = ctx.request.body({ type: "json" });
    const { text } = await value;
    const newTodo: Todo = {
        // id: new Date().toISOString(),
        text: text
    };

   const id = await getDb().collection('todos').insertOne(newTodo);

    newTodo.id = id.$oid;

    ctx.response.body = { message: 'Created todo', todo:newTodo }
});

router.put('/todos/:todoId', async (ctx)=>{
    const tid = ctx.params.todoId!;//! always be not undefined
    const { value } = ctx.request.body({ type: "json" });
    const { text } = await value;

    await getDb().collection('todos')
        .updateOne({_id: ObjectId(tid)}, { $set: {text: text}});

    ctx.response.body = {
        message: 'updated todo'
    }
});

router.delete('/todos/:todoId', async (ctx)=>{
    const tid = ctx.params.todoId!;

    await getDb().collection('todos').deleteOne({_id: ObjectId(tid)});

    ctx.response.body = {
        message: 'todo deleted'
    }
});

export default router;