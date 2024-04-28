/*
  Warnings:

  - The primary key for the `recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `owner` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_Name_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_pkey",
DROP COLUMN "Id",
ADD COLUMN     "owner" TEXT NOT NULL,
ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("owner");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_owner_fkey" FOREIGN KEY ("owner") REFERENCES "recipeUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
