/*
  Warnings:

  - You are about to drop the column `cor` on the `Recurso` table. All the data in the column will be lost.
  - You are about to drop the column `icone` on the `Recurso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recurso" DROP COLUMN "cor",
DROP COLUMN "icone";
