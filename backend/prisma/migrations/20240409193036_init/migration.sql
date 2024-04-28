/*
  Warnings:

  - The primary key for the `recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_pkey",
DROP COLUMN "id",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_Name_key" ON "recipes"("Name");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_Name_fkey" FOREIGN KEY ("Name") REFERENCES "recipeUser"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
