const clientesModels = require("../../models/clientes/clientesModels");
const logger = require("../../utils/logger");

module.exports = {
  async getAllClientes(req, res, next) {
    try {
      const clientes = await clientesModels.getAllClientes();

      if (!clientes || clientes?.length === 0) {
        return res
          .status(200)
          .json({ message: "Nenhum cliente encontrado no sistema" });
      }

      return res.status(200).json(clientes);
    } catch (error) {
      logger.error("Erro em clientesControllers/getAllClientes:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async getClienteById(req, res, next) {
    try {
      const { id } = req.params;

      const cliente = await clientesModels.getClienteById(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      logger.error("Erro em clientesControllers/getClienteById:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async createCliente(req, res, next) {
    try {
      const data = req.body;

      if (!data || !data.nome || !data.cpf) {
        return res.status(400).json({ error: "Dados necessários incompletos" });
      }

      const novoCliente = await clientesModels.createCliente(data);

      return res.status(201).json(novoCliente);
    } catch (error) {
      logger.error("Erro em clientesControllers/createCliente:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async updateCliente(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!data || Object.keys(data)?.length === 0) {
        return res
          .status(400)
          .json({ error: "Nenhum dado fornecido para atualização" });
      }

      const clienteAtualizado = await clientesModels.updateCliente(id, data);

      return res.status(200).json(clienteAtualizado);
    } catch (error) {
      logger.error("Erro em clientesControllers/updateCliente:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },

  async deleteCliente(req, res, next) {
    try {
      const { id } = req.params;

      const clienteDeletado = await clientesModels.deleteCliente(id);

      return res.status(200).json(clienteDeletado);
    } catch (error) {
      logger.error("Erro em clientesControllers/deleteCliente:", error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },
};
