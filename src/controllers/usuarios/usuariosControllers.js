const usuarioModels = require("../../models/usuarios/usuariosModels");
const logger = require("../../utils/logger");

module.exports = {
  async getAllUsuarios(req, res, next) {
    try {
      const usuarios = await usuarioModels.getAllUsuarios();

      if (!usuarios || usuarios?.length === 0) {
        return res.status(200).json({ message: "Nenhum usuário encontrado" });
      }

      return res.status(200).json(usuarios);
    } catch (error) {
      logger.error("Erro em usuarioControllers/getAllUsuarios:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async getUsuarioById(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await usuarioModels.getUsuarioById(id);

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      logger.error("Erro em usuarioControllers/getUsuarioById:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async createUsuario(req, res, next) {
    try {
      const data = req.body;

      if (
        !data ||
        !data.nome ||
        !data.email ||
        !data.senha ||
        !data.autorizacao
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const { nome, email, senha, autorizacao } = data;

      const usuarioNovo = await usuarioModels.createUsuario({
        nome,
        email,
        senha,
        autorizacao,
      });

      return res.status(201).json(usuarioNovo);
    } catch (error) {
      logger.error("Erro em usuarioControllers/createUsuario:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async updateUsuario(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
      }
      const usuarioAtualizado = await usuarioModels.updateUsuario(id, data);

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      logger.error("Erro em usuarioControllers/updateUsuario:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async deleteUsuario(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
      }
      const usuarioDeletado = await usuarioModels.deleteUsuario(id);

      return res.status(200).json(usuarioDeletado);
    } catch (error) {
      logger.error("Erro em usuarioControllers/deleteUsuario:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },
};
