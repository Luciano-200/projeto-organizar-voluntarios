/*
  Warnings:

  - The values [Manha,Tarde,Noite,ManhaTarde,ManhaNoite,TardeNoite,ManhaTardeNoite] on the enum `Availability` will be removed. If these variants are still used in the database, this will fail.
  - The values [Alimento,Roupa_E_Calcados,Higiene_Pessoal,Limpeza,Itens_De_Cama,Moveis,Dinheiro,Especialista,Voluntario] on the enum `CategoryOfNeed` will be removed. If these variants are still used in the database, this will fail.
  - The values [Nenhuma,Medico,Enfermeiro,Bombeiro,Psicologo,Policial,SalvaVidas,Engenheiro,Veterinario] on the enum `Expertise` will be removed. If these variants are still used in the database, this will fail.
  - The values [Outro_Pais,Regiao_Sul,Regiao_Nordeste,Regiao_Norte,Regiao_Sudeste,Regiao_Centro_Oeste] on the enum `Region` will be removed. If these variants are still used in the database, this will fail.
  - The values [Marcada,Iniciada,Terminada] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [User,Admin] on the enum `User` will be removed. If these variants are still used in the database, this will fail.
  - The values [Fez_Contato,Selecionado,Encerrado] on the enum `VolunteerStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Availability_new" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'MORNING_AFTERNOON', 'MORNING_EVENING', 'AFTERNOON_EVENING', 'FULL_DAY');
ALTER TABLE "Volunteer" ALTER COLUMN "availabilityTime" TYPE "Availability_new" USING ("availabilityTime"::text::"Availability_new");
ALTER TYPE "Availability" RENAME TO "Availability_old";
ALTER TYPE "Availability_new" RENAME TO "Availability";
DROP TYPE "Availability_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CategoryOfNeed_new" AS ENUM ('FOOD', 'CLOTHING_AND_FOOTWEAR', 'PERSONAL_HYGIENE', 'CLEANING_SUPPLIES', 'BEDDING', 'FURNITURE', 'MONEY', 'SPECIALIST', 'VOLUNTEER');
ALTER TABLE "Needs" ALTER COLUMN "categoryOfNeed" TYPE "CategoryOfNeed_new" USING ("categoryOfNeed"::text::"CategoryOfNeed_new");
ALTER TYPE "CategoryOfNeed" RENAME TO "CategoryOfNeed_old";
ALTER TYPE "CategoryOfNeed_new" RENAME TO "CategoryOfNeed";
DROP TYPE "CategoryOfNeed_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Expertise_new" AS ENUM ('NONE', 'DOCTOR', 'NURSE', 'FIREFIGHTER', 'PSYCHOLOGIST', 'POLICE_OFFICER', 'LIFEGUARD', 'ENGINEER', 'VETERINARIAN');
ALTER TABLE "Volunteer" ALTER COLUMN "expertise" DROP DEFAULT;
ALTER TABLE "Volunteer" ALTER COLUMN "expertise" TYPE "Expertise_new" USING ("expertise"::text::"Expertise_new");
ALTER TYPE "Expertise" RENAME TO "Expertise_old";
ALTER TYPE "Expertise_new" RENAME TO "Expertise";
DROP TYPE "Expertise_old";
ALTER TABLE "Volunteer" ALTER COLUMN "expertise" SET DEFAULT 'NONE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Region_new" AS ENUM ('INTERNATIONAL', 'NORTH', 'NORTHEAST', 'SOUTH', 'SOUTHEAST', 'CENTRAL_WEST');
ALTER TABLE "Volunteer" ALTER COLUMN "region" TYPE "Region_new" USING ("region"::text::"Region_new");
ALTER TYPE "Region" RENAME TO "Region_old";
ALTER TYPE "Region_new" RENAME TO "Region";
DROP TYPE "Region_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('SCHEDULED', 'STARTED', 'COMPLETED');
ALTER TABLE "Tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tasks" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
ALTER TABLE "Tasks" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "User_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Account" ALTER COLUMN "user" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "user" TYPE "User_new" USING ("user"::text::"User_new");
ALTER TYPE "User" RENAME TO "User_old";
ALTER TYPE "User_new" RENAME TO "User";
DROP TYPE "User_old";
ALTER TABLE "Account" ALTER COLUMN "user" SET DEFAULT 'USER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "VolunteerStatus_new" AS ENUM ('CONTACTED', 'SELECTED', 'CLOSED');
ALTER TABLE "Volunteer" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Volunteer" ALTER COLUMN "status" TYPE "VolunteerStatus_new" USING ("status"::text::"VolunteerStatus_new");
ALTER TYPE "VolunteerStatus" RENAME TO "VolunteerStatus_old";
ALTER TYPE "VolunteerStatus_new" RENAME TO "VolunteerStatus";
DROP TYPE "VolunteerStatus_old";
ALTER TABLE "Volunteer" ALTER COLUMN "status" SET DEFAULT 'CONTACTED';
COMMIT;

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "user" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "expertise" SET DEFAULT 'NONE',
ALTER COLUMN "status" SET DEFAULT 'CONTACTED';
