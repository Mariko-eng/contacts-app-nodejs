const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config() // provides the process.env that provides the env variables

connectDb();

const app = express();

app.use(express.json())

const port = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.status(200).send("Home")
})

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

