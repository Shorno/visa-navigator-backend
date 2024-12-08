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

export async function visaApplication(db, application) {
    return db.collection("visaApplications").insertOne(application);
}

export async function getVisaApplicationsByEmail(db, email) {
    return db.collection("visaApplications").find({email: email}).toArray();
}

export async function getVisaByUserEmail(db, email) {
    return db.collection("visa").find({email: email}).toArray();
}

export async function updateVisa(db, visaId, updatedVisa) {
    return db.collection("visa").updateOne({_id: new ObjectId(visaId)}, {$set: updatedVisa});
}

export async function deleteVisa(db, visaId) {
    return db.collection("visa").deleteOne({_id: new ObjectId(visaId)});
}

