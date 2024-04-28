-- AlterTable
CREATE SEQUENCE recipeuser_id_seq;
ALTER TABLE "recipeUser" ALTER COLUMN "id" SET DEFAULT nextval('recipeuser_id_seq');
ALTER SEQUENCE recipeuser_id_seq OWNED BY "recipeUser"."id";
