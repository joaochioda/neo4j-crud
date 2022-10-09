const express = require("express");
const routes = express.Router();

const PersonController = require("./controllers/PersonController");

routes.post("/api/v1/person" , PersonController.store);
routes.get("/api/v1/person/:id" , PersonController.findById);
routes.get("/api/v1/person" , PersonController.findAll);
routes.delete("/api/v1/person/:id" , PersonController.delete);
routes.put("/api/v1/person/:id" , PersonController.update);

module.exports = routes;
