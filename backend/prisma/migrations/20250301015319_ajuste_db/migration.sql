-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "fotoPerfil" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimoAcesso" TIMESTAMP(3),
    "universidadeId" UUID,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universidade" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contatoSeguranca" TEXT,
    "contatoOuvidoria" TEXT,

    CONSTRAINT "Universidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visibilidade" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataComentario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visibilidade" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoApoio" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "local" TEXT,
    "horario" TEXT,
    "diaSemana" TEXT,
    "universidadeId" UUID NOT NULL,
    "imagem" TEXT,
    "contatoResponsavel" TEXT,

    CONSTRAINT "GrupoApoio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipacaoGrupo" (
    "usuarioId" UUID NOT NULL,
    "grupoId" UUID NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipacaoGrupo_pkey" PRIMARY KEY ("usuarioId","grupoId")
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "icone" TEXT,
    "cor" TEXT,
    "linkExterno" TEXT,

    CONSTRAINT "Recurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcessoRecurso" (
    "usuarioId" UUID NOT NULL,
    "recursoId" UUID NOT NULL,
    "dataAcesso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcessoRecurso_pkey" PRIMARY KEY ("usuarioId","recursoId")
);

-- CreateTable
CREATE TABLE "ContatoEmergencia" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "icone" TEXT,
    "cor" TEXT,

    CONSTRAINT "ContatoEmergencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertaEmergencia" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localizacao" TEXT,
    "status" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "AlertaEmergencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoConfianca" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "relacao" TEXT NOT NULL,

    CONSTRAINT "ContatoConfianca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curtida" (
    "usuarioId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "dataCurtida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curtida_pkey" PRIMARY KEY ("usuarioId","postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_universidadeId_fkey" FOREIGN KEY ("universidadeId") REFERENCES "Universidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoApoio" ADD CONSTRAINT "GrupoApoio_universidadeId_fkey" FOREIGN KEY ("universidadeId") REFERENCES "Universidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipacaoGrupo" ADD CONSTRAINT "ParticipacaoGrupo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipacaoGrupo" ADD CONSTRAINT "ParticipacaoGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoApoio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcessoRecurso" ADD CONSTRAINT "AcessoRecurso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcessoRecurso" ADD CONSTRAINT "AcessoRecurso_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertaEmergencia" ADD CONSTRAINT "AlertaEmergencia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContatoConfianca" ADD CONSTRAINT "ContatoConfianca_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
