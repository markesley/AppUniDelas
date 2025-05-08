/*
  Warnings:

  - Changed the type of `visibilidade` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Visibilidade" AS ENUM ('PUBLICO', 'ANONIMO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'REMOVIDO');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "visibilidade",
ADD COLUMN     "visibilidade" "Visibilidade" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
