import express from "express";
import cors from "cors";
import {connectToDatabase} from "./db.js";
import {addNewUser, addNewVisa, getAllVisas, getLatestVisas, getVisaById} from "./queries.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Check api routes at /api");
});

app.get("/api", (req, res) => {
    res.send("Hello World");
})

app.post("/api/visa", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newVisa = req.body;
        const result = await addNewVisa(db, newVisa);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error adding new visa"});
    }
});

app.get("/api/visa", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visas = await getAllVisas(db);
        res.status(200).json(visas);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching visas"});
    }
});


app.get("/api/latestVisas", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visas = await getLatestVisas(db, 6);
        res.status(200).json(visas);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching latest visas"});
    }
});

app.get("/api/visa/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visaId = req.params.id;
        const visa = await getVisaById(db, visaId);
        res.status(200).json(visa);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching visa"});
    }
});

app.post("api/users", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newUser = req.body;
        const result = await addNewUser(db, newUser);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error adding new user"});
    }
});


app.listen(PORT, () => {
    console.log(`Local sever running on http://localhost:${PORT}/api `);
});

export default app;