-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectLeadId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectLeadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectLeadId_fkey" FOREIGN KEY ("projectLeadId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
