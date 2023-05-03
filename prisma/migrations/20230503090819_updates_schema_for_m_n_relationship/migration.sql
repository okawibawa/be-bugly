/*
  Warnings:

  - You are about to drop the column `projectLeadId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `leadId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VIEWER', 'MEMBER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectLeadId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectLeadId",
ADD COLUMN     "leadId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProjectMembers" (
    "memberId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "ProjectMembers_pkey" PRIMARY KEY ("memberId")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
