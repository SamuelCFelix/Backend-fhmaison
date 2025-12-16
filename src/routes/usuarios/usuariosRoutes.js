const express = require("express");
const routes = express.Router();

// Importar os módulos de rota
const usuariosControllers = require("../../controllers/usuarios/usuariosControllers");

routes.get("/", usuariosControllers.getAllUsuarios);
routes.get("/:id", usuariosControllers.getUsuarioById);
routes.post("/", usuariosControllers.createUsuario);
routes.put("/:id", usuariosControllers.updateUsuario);
routes.delete("/:id", usuariosControllers.deleteUsuario);

module.exports = routes;
