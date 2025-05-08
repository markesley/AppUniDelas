-- CreateTable
CREATE TABLE "RedeApoioRequest" (
    "id" UUID NOT NULL,
    "solicitanteId" UUID NOT NULL,
    "solicitadoId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "dataSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedeApoioRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RedeApoioRequest" ADD CONSTRAINT "RedeApoioRequest_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeApoioRequest" ADD CONSTRAINT "RedeApoioRequest_solicitadoId_fkey" FOREIGN KEY ("solicitadoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
