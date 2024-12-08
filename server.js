import express from "express";
import cors from "cors";
import {connectToDatabase} from "./db.js";
import {
    addNewVisa, deleteVisa, deleteVisaApplication,
    getAllVisas,
    getLatestVisas, getVisaApplicationsByEmail,
    getVisaById,
    getVisaByUserEmail, getVisasByType, updateVisa,
    visaApplication
} from "./queries.js";

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
        const email = req.query.email;
        let visas;
        if (email) {
            visas = await getVisaByUserEmail(db, email);
        } else {
            visas = await getAllVisas(db);
        }
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

app.put("/api/visa/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visaId = req.params.id;
        const updatedVisa = req.body;
        const result = await updateVisa(db, visaId, updatedVisa);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error updating visa"});
    }
});


app.delete("/api/visa/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visaId = req.params.id;
        const result = await deleteVisa(db, visaId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error deleting visa"});
    }
});

app.post("/api/visaApplication", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const application = req.body;
        const result = await visaApplication(db, application);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error applying for visa"});
    }
});

app.get("/api/visaApplication", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const email = req.query.email;
        const applications = await getVisaApplicationsByEmail(db, email);
        res.status(200).json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching visa applications"});
    }
});


app.delete("/api/visaApplication/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const applicationId = req.params.id;
        console.log("Deleting application with id:", applicationId);
        const result = await deleteVisaApplication(db, applicationId);
        console.log("Result:", result);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error deleting visa application"});
    }
});


app.get("/api/visaByType", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const visaType = req.query.type;
        const visas = await getVisasByType(db, visaType);
        res.status(200).json(visas);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching visas by type"});
    }
});


app.listen(PORT, () => {
    console.log(`Local sever running on http://localhost:${PORT}/api `);
});

export default app;