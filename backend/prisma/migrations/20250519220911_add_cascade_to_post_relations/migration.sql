-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_postId_fkey";

-- DropForeignKey
ALTER TABLE "Curtida" DROP CONSTRAINT "Curtida_postId_fkey";

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
