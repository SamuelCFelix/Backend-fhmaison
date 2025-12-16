const prisma = require("../../utils/prismaClient");
const logger = require("../../utils/logger");

module.exports = {
  async getAllClientes() {
    try {
      const clientes = await prisma.cliente.findMany({
        orderBy: { createdAt: "asc" },
      });
      return clientes;
    } catch (error) {
      error.path = "models/clientes/clientesModels/getAllClientes";
      logger.error("Erro ao buscar clientes:", error);
      throw error;
    }
  },

  async getClienteById(id) {
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id },
      });
      return cliente;
    } catch (error) {
      error.path = "models/clientes/clientesModels/getClienteById";
      logger.error(`Erro ao buscar cliente com ID ${id}:`, error);
      throw error;
    }
  },

  async createCliente(data) {
    try {
      const { cpf, ...clienteData } = data;

      const clienteExistente = await prisma.cliente.findUnique({
        where: { cpf },
      });

      if (clienteExistente) {
        const err = new Error("CPF já está em uso");
        err.status = 409;
        throw err;
      }

      const novoCliente = await prisma.cliente.create({
        data: { cpf, ...clienteData },
      });

      return { message: "Cliente criado com sucesso.", data: novoCliente };
    } catch (error) {
      error.path = "models/clientes/clientesModels/createCliente";
      logger.error("Erro ao criar cliente:", error);
      throw error;
    }
  },

  async updateCliente(id, data) {
    try {
      const clienteExistente = await prisma.cliente.findUnique({
        where: { id },
      });

      if (!clienteExistente) {
        const err = new Error("Cliente não encontrado");
        err.status = 404;
        throw err;
      }

      const clienteAtualizado = await prisma.cliente.update({
        where: { id },
        data: { ...data },
      });

      return {
        message: "Cliente atualizado com sucesso.",
        data: clienteAtualizado,
      };
    } catch (error) {
      error.path = "models/clientes/clientesModels/updateCliente";
      logger.error("Erro ao atualizar cliente:", error);
      throw error;
    }
  },

  async deleteCliente(id) {
    try {
      const clienteExistente = await prisma.cliente.findUnique({
        where: { id },
      });

      if (!clienteExistente) {
        const err = new Error("Cliente não encontrado");
        err.status = 404;
        throw err;
      }

      const clienteDeletado = await prisma.cliente.delete({
        where: { id },
      });

      return {
        message: "Cliente deletado com sucesso.",
        data: clienteDeletado,
      };
    } catch (error) {
      error.path = "models/clientes/clientesModels/deleteCliente";
      logger.error("Erro ao deletar cliente:", error);
      throw error;
    }
  },
};
