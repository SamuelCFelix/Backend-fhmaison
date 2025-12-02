const express = require("express");
const routes = express.Router();

// Importar os módulos de rota
const usuarioRoutes = require("./usuarios/usuariosRoutes");

// Definir os prefixos de rota
routes.use("/usuarios", usuarioRoutes);

module.exports = routes;
