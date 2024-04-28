-- CreateTable
CREATE TABLE "recipeUser" (
    "id" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "recipeUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipeUser_userName_key" ON "recipeUser"("userName");
