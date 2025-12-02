const prisma = require("../../utils/prismaClient");
const logger = require("../../utils/logger");
const bcrypt = require("bcryptjs");

module.exports = {
  async getAllUsuarios() {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          autorizacao: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
      });

      return usuarios;
    } catch (error) {
      error.path = "models/usuario/usuarioModels/getAllUsuarios";
      logger.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  async getUsuarioById(id) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nome: true,
          email: true,
          autorizacao: true,
          createdAt: true,
        },
      });

      return usuario;
    } catch (error) {
      error.path = "models/usuario/usuarioModels/getUsuarioById";
      logger.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  async createUsuario(data) {
    try {
      const { email, senha, ...usuarioData } = data;

      // Verificar se o email já está em uso
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (usuarioExistente) {
        const err = new Error("Email já está em uso");
        err.status = 409;
        throw err;
      }

      // Hash da senha antes de salvar
      const hashedSenha = await bcrypt.hash(senha, 10);

      const novoUsuario = await prisma.usuario.create({
        data: { email, senha: hashedSenha, ...usuarioData },
        select: {
          id: true,
          nome: true,
          email: true,
          autorizacao: true,
          createdAt: true,
        },
      });

      return { message: "Usuário criado com sucesso.", data: novoUsuario };
    } catch (error) {
      error.path = "models/usuario/usuarioModels/createUsuario";
      logger.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  async updateUsuario(id, data) {
    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id },
      });

      if (!usuarioExistente) {
        const err = new Error("Usuário não encontrado");
        err.status = 404;
        throw err;
      }

      const { senha, ...updateData } = data;

      // Se a senha estiver sendo atualizada, faça o hash
      if (senha) {
        const hashedSenha = await bcrypt.hash(senha, 10);
        updateData.senha = hashedSenha;
      }

      const usuarioAtualizado = await prisma.usuario.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          nome: true,
          email: true,
          autorizacao: true,
          createdAt: true,
        },
      });

      return {
        message: "Usuário atualizado com sucesso.",
        data: usuarioAtualizado,
      };
    } catch (error) {
      error.path = "models/usuario/usuarioModels/updateUsuario";
      logger.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  async deleteUsuario(id) {
    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id },
      });

      if (!usuarioExistente) {
        const err = new Error("Usuário não encontrado");
        err.status = 404;
        throw err;
      }

      const usuarioDeletado = await prisma.usuario.delete({
        where: { id },
        select: {
          id: true,
          nome: true,
          email: true,
          autorizacao: true,
          createdAt: true,
        },
      });

      return {
        message: "Usuário deletado com sucesso.",
        data: usuarioDeletado,
      };
    } catch (error) {
      error.path = "models/usuario/usuarioModels/deleteUsuario";
      logger.error(`Erro ao deletar usuário com ID ${id}:`, error);
      throw error;
    }
  },
};
