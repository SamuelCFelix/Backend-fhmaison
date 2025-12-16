const express = require("express");
const routes = express.Router();

// Importar os módulos de rota
const usuariosRoutes = require("./usuarios/usuariosRoutes");
const clientesRoutes = require("./clientes/clientesRoutes");

// Definir os prefixos de rota
routes.use("/usuarios", usuariosRoutes);
routes.use("/clientes", clientesRoutes);

module.exports = routes;
