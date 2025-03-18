import { MongoClient } from "mongodb"

let client: MongoClient
let clientPromise: Promise<MongoClient>
const options = {}

const URI = process.env.MONGODB_URI
const DB = "Ragazzi"

client = new MongoClient(URI, options)
clientPromise = client.connect()

export async function DDBB() {
    try {
        const clientDB = await clientPromise
        const db = clientDB.db(DB)
        return db.collection("PagosPendientes").find().toArray()
    }
    catch (err){
        console.log("Error", JSON.stringify(err))
    }
}