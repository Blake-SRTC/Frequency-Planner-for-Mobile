const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const path = require("path");
const router = express.Router();

// Middleware para usar otras caracteristicas de json
app.use(express.json());

// Rutas API
app.use(express.static("public"));
app.use("/", router);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

router.get("*", (req, res) => {
    res.send("404 not found");
});

server.listen(5000, () => {
    console.log("listening on *:6000");
});
