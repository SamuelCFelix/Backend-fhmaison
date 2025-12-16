const express = require("express");
const routes = express.Router();

// Importar os módulos de rota
const clientesControllers = require("../../controllers/clientes/clientesControllers");

routes.get("/", clientesControllers.getAllClientes);
routes.get("/:id", clientesControllers.getClienteById);
routes.post("/", clientesControllers.createCliente);
routes.put("/:id", clientesControllers.updateCliente);
routes.delete("/:id", clientesControllers.deleteCliente);

module.exports = routes;
