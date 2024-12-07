import {ObjectId} from "mongodb";


export async function addNewVisa(db, newVisa) {
    return db.collection("visa").insertOne(newVisa);
}

export async function getAllVisas(db) {
    return db.collection("visa").find().toArray();
}

export async function getLatestVisas(db, limit) {
    return db.collection("visa").find().sort({_id: -1}).limit(limit).toArray();
}

export async function getVisaById(db, visaId) {
    return db.collection("visa").findOne({_id: new ObjectId(visaId)});
}


export async function addNewUser(db, newUser) {
    return db.collection("users").insertOne(newUser);
}