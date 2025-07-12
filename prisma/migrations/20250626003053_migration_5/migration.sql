-- CreateEnum
CREATE TYPE "User" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "user" "User" DEFAULT 'User';
