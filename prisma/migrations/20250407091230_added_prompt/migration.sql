/*
  Warnings:

  - You are about to drop the column `userId` on the `Generator` table. All the data in the column will be lost.
  - Made the column `email` on table `Generator` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Generator" DROP CONSTRAINT "Generator_userId_fkey";

-- DropIndex
DROP INDEX "Generator_userId_idx";

-- AlterTable
ALTER TABLE "Generator" DROP COLUMN "userId",
ALTER COLUMN "email" SET NOT NULL;
