/*
  Warnings:

  - You are about to drop the column `especialidade` on the `Necessidades` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Necessidades` table. All the data in the column will be lost.
  - You are about to drop the column `pessoal` on the `Necessidades` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_item` on the `Necessidades` table. All the data in the column will be lost.
  - You are about to drop the column `verba` on the `Necessidades` table. All the data in the column will be lost.
  - You are about to drop the column `conta_id` on the `Organizador` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `Tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `data_inicio` on the `Tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `conta_id` on the `Voluntario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contaId]` on the table `Organizador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contaId]` on the table `Voluntario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `necessidade` to the `Necessidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaId` to the `Organizador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaId` to the `Voluntario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoDaNecessidade" AS ENUM ('Alimento', 'Roupa_E_Calcados', 'Higiene_Pessoal', 'Limpeza', 'Itens_De_Cama', 'Moveis', 'Dinheiro', 'Especialista', 'Voluntario');

-- DropForeignKey
ALTER TABLE "Organizador" DROP CONSTRAINT "Organizador_conta_id_fkey";

-- DropForeignKey
ALTER TABLE "Voluntario" DROP CONSTRAINT "Voluntario_conta_id_fkey";

-- DropIndex
DROP INDEX "Organizador_conta_id_key";

-- DropIndex
DROP INDEX "Voluntario_conta_id_key";

-- AlterTable
ALTER TABLE "Necessidades" DROP COLUMN "especialidade",
DROP COLUMN "item",
DROP COLUMN "pessoal",
DROP COLUMN "tipo_item",
DROP COLUMN "verba",
ADD COLUMN     "necessidade" TEXT NOT NULL,
ADD COLUMN     "tipoNecessidade" "TipoDaNecessidade";

-- AlterTable
ALTER TABLE "Organizador" DROP COLUMN "conta_id",
ADD COLUMN     "contaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tarefas" DROP COLUMN "data_atualizacao",
DROP COLUMN "data_inicio",
ADD COLUMN     "dataFim" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "detalhes" SET DATA TYPE TEXT,
ALTER COLUMN "equipamentos" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Voluntario" DROP COLUMN "conta_id",
ADD COLUMN     "contaId" INTEGER NOT NULL,
ALTER COLUMN "disponibilidade" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "TipoDoItem";

-- CreateIndex
CREATE UNIQUE INDEX "Organizador_contaId_key" ON "Organizador"("contaId");

-- CreateIndex
CREATE UNIQUE INDEX "Voluntario_contaId_key" ON "Voluntario"("contaId");

-- AddForeignKey
ALTER TABLE "Organizador" ADD CONSTRAINT "Organizador_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voluntario" ADD CONSTRAINT "Voluntario_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
