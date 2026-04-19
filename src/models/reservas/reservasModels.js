const prisma = require("../../utils/prismaClient");
const logger = require("../../utils/logger");

module.exports = {
  async createReserva(data) {
    try {
      const response = await prisma.$transaction(async (prisma) => {
        const reserva = await prisma.reserva.create({});
      });
    } catch (error) {
      error.path = "models/reservas/reservasModels/createReserva";
      logger.error("Erro ao criar reserva:", error);
      throw error;
    }
  },
};
