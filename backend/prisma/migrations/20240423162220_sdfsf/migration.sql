/*
  Warnings:

  - The `savedRecipes` column on the `recipeUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "recipeUser" DROP COLUMN "savedRecipes",
ADD COLUMN     "savedRecipes" INTEGER[];
