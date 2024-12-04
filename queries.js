import {ObjectId} from "mongodb";


export async function addNewVisa(db, newVisa) {
    return db.collection("visa").insertOne(newVisa);
}
