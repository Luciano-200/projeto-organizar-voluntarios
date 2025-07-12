-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Marcada';

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "status" DROP NOT NULL;
