-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "autorizacao" DROP NOT NULL;

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "cep" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrato_reservas" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3),
    "tipoEvento" TEXT,
    "nomeCliente" TEXT,
    "cpfCliente" TEXT,
    "valorPago" DOUBLE PRECISION DEFAULT 0,
    "valorTotal" DOUBLE PRECISION,
    "formaPagamento" TEXT,
    "observacaoPagamento" TEXT,
    "statusContrato" INTEGER,
    "contratoPdfUrl" TEXT,
    "hashDocumento" TEXT,
    "dataAssinatura" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT,

    CONSTRAINT "contrato_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "euSou" TEXT NOT NULL,
    "dataProva" TIMESTAMP(3) NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL,
    "dataDevolucao" TIMESTAMP(3) NOT NULL,
    "reservaMultipla" BOOLEAN NOT NULL,
    "valorReserva" DOUBLE PRECISION NOT NULL,
    "atendente" TEXT NOT NULL,
    "statusReserva" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contratoReservaId" TEXT NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descricao_vestuarios" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "precisaAjuste" INTEGER NOT NULL,
    "descricaoAjuste" TEXT,
    "dataAjuste" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservaId" TEXT NOT NULL,

    CONSTRAINT "descricao_vestuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observacao_reservas" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservaId" TEXT NOT NULL,

    CONSTRAINT "observacao_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acessorio_reservas" (
    "id" TEXT NOT NULL,
    "acessorio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservaId" TEXT NOT NULL,

    CONSTRAINT "acessorio_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "multipla_reservas" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservaId" TEXT NOT NULL,

    CONSTRAINT "multipla_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "contrato_reservas_codigo_key" ON "contrato_reservas"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "contrato_reservas_hashDocumento_key" ON "contrato_reservas"("hashDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "reservas_codigo_key" ON "reservas"("codigo");

-- AddForeignKey
ALTER TABLE "contrato_reservas" ADD CONSTRAINT "contrato_reservas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_contratoReservaId_fkey" FOREIGN KEY ("contratoReservaId") REFERENCES "contrato_reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao_vestuarios" ADD CONSTRAINT "descricao_vestuarios_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observacao_reservas" ADD CONSTRAINT "observacao_reservas_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessorio_reservas" ADD CONSTRAINT "acessorio_reservas_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multipla_reservas" ADD CONSTRAINT "multipla_reservas_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
