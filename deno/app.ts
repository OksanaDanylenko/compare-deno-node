import { Application } from "https://deno.land/x/oak/mod.ts";
import todosRoutes from './routes/todos.ts';
import { connect } from './helpers/db_client.ts';

connect();

const app = new Application();

//if there is some async function in routes on middleware we should use asyn
//to wait for them to finish before generate auto response
app.use(async (ctx, next)=>{
    console.log('middleware');
   await next();
})

app.use(async (ctx, next)=> {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*');
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
})

app.use(todosRoutes.routes())
app.use(todosRoutes.allowedMethods())

await app.listen({port: 8000})