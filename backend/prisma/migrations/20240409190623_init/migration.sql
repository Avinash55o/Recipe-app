-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "imgurl" TEXT NOT NULL,
    "cookingTime" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);
