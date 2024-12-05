import {ObjectId} from "mongodb";


export async function addNewVisa(db, newVisa) {
    return db.collection("visa").insertOne(newVisa);
}
export async function getAllVisas(db) {
    return db.collection("visa").find().toArray();
}



export async function addNewUser(db, newUser) {
    return db.collection("users").insertOne(newUser);
}