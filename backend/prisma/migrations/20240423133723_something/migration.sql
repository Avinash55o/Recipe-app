/*
  Warnings:

  - The primary key for the `recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("id");
