/*
  Warnings:

  - You are about to drop the `Conta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Necessidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organizador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarefas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voluntario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TarefasToVoluntario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Expertise" AS ENUM ('Nenhuma', 'Medico', 'Enfermeiro', 'Bombeiro', 'Psicologo', 'Policial', 'SalvaVidas', 'Engenheiro', 'Veterinario');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Marcada', 'Iniciada', 'Terminada');

-- CreateEnum
CREATE TYPE "CategoryOfNeed" AS ENUM ('Alimento', 'Roupa_E_Calcados', 'Higiene_Pessoal', 'Limpeza', 'Itens_De_Cama', 'Moveis', 'Dinheiro', 'Especialista', 'Voluntario');

-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('Fez_Contato', 'Selecionado', 'Encerrado');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('Outro_Pais', 'Regiao_Sul', 'Regiao_Nordeste', 'Regiao_Norte', 'Regiao_Sudeste', 'Regiao_Centro_Oeste');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('Manha', 'Tarde', 'Noite', 'ManhaTarde', 'ManhaNoite', 'TardeNoite', 'ManhaTardeNoite');

-- DropForeignKey
ALTER TABLE "Organizador" DROP CONSTRAINT "Organizador_contaId_fkey";

-- DropForeignKey
ALTER TABLE "Voluntario" DROP CONSTRAINT "Voluntario_contaId_fkey";

-- DropForeignKey
ALTER TABLE "_TarefasToVoluntario" DROP CONSTRAINT "_TarefasToVoluntario_A_fkey";

-- DropForeignKey
ALTER TABLE "_TarefasToVoluntario" DROP CONSTRAINT "_TarefasToVoluntario_B_fkey";

-- DropTable
DROP TABLE "Conta";

-- DropTable
DROP TABLE "Necessidades";

-- DropTable
DROP TABLE "Organizador";

-- DropTable
DROP TABLE "Tarefas";

-- DropTable
DROP TABLE "Voluntario";

-- DropTable
DROP TABLE "_TarefasToVoluntario";

-- DropEnum
DROP TYPE "Especialista";

-- DropEnum
DROP TYPE "Local";

-- DropEnum
DROP TYPE "StatusTarefas";

-- DropEnum
DROP TYPE "StatusVoluntarios";

-- DropEnum
DROP TYPE "TipoDaNecessidade";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "region" "Region" NOT NULL,
    "availabilityTime" "Availability" NOT NULL,
    "availability" TEXT,
    "equipment" VARCHAR(255),
    "expertise" "Expertise" DEFAULT 'Nenhuma',
    "status" "VolunteerStatus" NOT NULL DEFAULT 'Fez_Contato',
    "phoneNumber" VARCHAR(255),

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Needs" (
    "id" SERIAL NOT NULL,
    "needs" TEXT NOT NULL,
    "categoryOfNeed" "CategoryOfNeed",

    CONSTRAINT "Needs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "objectives" VARCHAR(255) NOT NULL,
    "details" TEXT,
    "equipments" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TasksToVolunteer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TasksToVolunteer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_accountId_key" ON "Organizer"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_accountId_key" ON "Volunteer"("accountId");

-- CreateIndex
CREATE INDEX "_TasksToVolunteer_B_index" ON "_TasksToVolunteer"("B");

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TasksToVolunteer" ADD CONSTRAINT "_TasksToVolunteer_A_fkey" FOREIGN KEY ("A") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TasksToVolunteer" ADD CONSTRAINT "_TasksToVolunteer_B_fkey" FOREIGN KEY ("B") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
