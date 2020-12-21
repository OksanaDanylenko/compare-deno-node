import { MongoClient, Database } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

let db: Database;

export function connect(){
    const client = new MongoClient();
    client.connectWithUri("mongodb+srv://oksana:we32rqwder1q@cluster0.hymvn.mongodb.net/?retryWrites=true&w=majority");

    db = client.database("todo-app");
}

export function getDb() {
    return db;
}