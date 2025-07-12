-- CreateEnum
CREATE TYPE "Especialista" AS ENUM ('Nenhuma', 'Medico', 'Enfermeiro', 'Bombeiro', 'Psicologo', 'Policial', 'SalvaVidas', 'Engenheiro', 'Veterinario');

-- CreateEnum
CREATE TYPE "StatusTarefas" AS ENUM ('Encerrada', 'Em_Andamento', 'Ja_Vai_Comecar', 'Marcada', 'Cancelada', 'Vai_Comecar_Em_Breve');

-- CreateEnum
CREATE TYPE "TipoDoItem" AS ENUM ('Alimento', 'Roupa_E_Calcados', 'Higiene_Pessoal', 'Limpeza', 'Itens_De_Cama', 'Moveis');

-- CreateEnum
CREATE TYPE "StatusVoluntarios" AS ENUM ('Fez_Contato', 'Selecionado', 'Nao_Necessario', 'Indisponivel', 'Ajuda_Encerrada');

-- CreateEnum
CREATE TYPE "Local" AS ENUM ('Outro_Pais', 'Regiao_Sul', 'Regiao_Nordeste', 'Regiao_Norte', 'Regiao_Sudeste', 'Regiao_Centro_Oeste');

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizador" (
    "id" SERIAL NOT NULL,
    "conta_id" INTEGER NOT NULL,

    CONSTRAINT "Organizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voluntario" (
    "id" SERIAL NOT NULL,
    "conta_id" INTEGER NOT NULL,
    "local" "Local" NOT NULL,
    "disponibilidade" VARCHAR(255) NOT NULL,
    "equipamento" VARCHAR(255),
    "especialidade" "Especialista" DEFAULT 'Nenhuma',
    "status" "StatusVoluntarios" NOT NULL DEFAULT 'Fez_Contato',
    "telefone" VARCHAR(255),

    CONSTRAINT "Voluntario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Necessidades" (
    "id" SERIAL NOT NULL,
    "item" VARCHAR(255),
    "tipo_item" "TipoDoItem",
    "verba" VARCHAR(255),
    "pessoal" VARCHAR(255),
    "especialidade" "Especialista" DEFAULT 'Nenhuma',

    CONSTRAINT "Necessidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefas" (
    "id" SERIAL NOT NULL,
    "objetivo" VARCHAR(255) NOT NULL,
    "detalhes" VARCHAR(255),
    "equipamentos" VARCHAR(255),
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "status" "StatusTarefas" NOT NULL,

    CONSTRAINT "Tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TarefasToVoluntario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TarefasToVoluntario_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conta_email_key" ON "Conta"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizador_conta_id_key" ON "Organizador"("conta_id");

-- CreateIndex
CREATE UNIQUE INDEX "Voluntario_conta_id_key" ON "Voluntario"("conta_id");

-- CreateIndex
CREATE INDEX "_TarefasToVoluntario_B_index" ON "_TarefasToVoluntario"("B");

-- AddForeignKey
ALTER TABLE "Organizador" ADD CONSTRAINT "Organizador_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voluntario" ADD CONSTRAINT "Voluntario_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TarefasToVoluntario" ADD CONSTRAINT "_TarefasToVoluntario_A_fkey" FOREIGN KEY ("A") REFERENCES "Tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TarefasToVoluntario" ADD CONSTRAINT "_TarefasToVoluntario_B_fkey" FOREIGN KEY ("B") REFERENCES "Voluntario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
