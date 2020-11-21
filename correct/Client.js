const express = require("express");
const app=express();
app.use(express.static("images"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.get("/Client.html", (req, res) => {
    res.sendFile(__dirname + "/Client.html");
})

app.listen(3332, () => {
    console.log("Client App running at 3332");
})
