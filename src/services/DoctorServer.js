const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "clinicms",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database.");
});

// Fetch all doctors
app.get("/doctors", (req, res) => {
    const query = "SELECT * FROM Doctors";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching doctors");
        } else {
            res.json(results);
        }
    });
});

// Update doctor status
app.put("/doctors/:id", (req, res) => {
    const { id } = req.params;
    const { isEnabled } = req.body;
    const query = "UPDATE Doctors SET isEnabled = ? WHERE id = ?";
    db.query(query, [isEnabled, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating doctor status");
        } else {
            res.send("Doctor status updated successfully");
        }
    });
});

// Start the server
const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
