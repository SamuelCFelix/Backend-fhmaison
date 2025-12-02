const express = require("express");
const routes = express.Router();

// Importar os módulos de rota
const usuarioRoutes = require("../../controllers/usuarios/usuariosControllers");

routes.get("/", usuarioRoutes.getAllUsuarios);
routes.get("/:id", usuarioRoutes.getUsuarioById);
routes.post("/", usuarioRoutes.createUsuario);
routes.put("/:id", usuarioRoutes.updateUsuario);
routes.delete("/:id", usuarioRoutes.deleteUsuario);

module.exports = routes;
