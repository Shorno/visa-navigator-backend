import express from "express";
import cors from "cors";
import {connectToDatabase} from "./db.js";
import {addNewVisa} from "./queries.js";

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

app.listen(PORT, () => {
    console.log(`Local sever running on http://localhost:${PORT}/api `);
});

export default app;