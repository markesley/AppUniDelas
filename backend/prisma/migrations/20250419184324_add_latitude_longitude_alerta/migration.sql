/*
  Warnings:

  - You are about to drop the column `descricao` on the `AlertaEmergencia` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `AlertaEmergencia` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `AlertaEmergencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlertaEmergencia" DROP COLUMN "descricao",
DROP COLUMN "localizacao",
DROP COLUMN "status",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
