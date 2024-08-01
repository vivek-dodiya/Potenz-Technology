const express = require("express")
const app = express()
const env = require("dotenv").config()
const PORT = process.env.PORT || 3000;


const userRagister = require("./routes/userRagisterRoutes")
const user = require("./routes/userGetRoutes")
const loginUser = require("./routes/userLoginRoutes")

const dbConnection = require("./config/mongoConnection")

dbConnection()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use("/ragister", userRagister)
app.use("/login", loginUser)
app.use("/profile", user)



app.listen(PORT ,  () => {
    console.log(`Server running on port ${PORT}`);
  })