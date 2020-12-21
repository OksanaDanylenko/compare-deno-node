import { serve } from "https://deno.land/std@0.81.0/http/server.ts";
//after first download it caches locally to improve speed execution time
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx)=>{
    ctx.response.body = "Hello World\n"
})

await app.listen({port: 8000})