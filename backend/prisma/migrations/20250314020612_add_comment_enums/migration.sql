/*
  Warnings:

  - Changed the type of `visibilidade` on the `Comentario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Comentario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "visibilidade",
ADD COLUMN     "visibilidade" "Visibilidade" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
