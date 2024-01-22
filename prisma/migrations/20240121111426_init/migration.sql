/*
  Warnings:

  - You are about to drop the column `descrption` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "descrption",
ADD COLUMN     "description" TEXT;
