import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//to show all the recipe
router.get("/", async (req, res) => {
  try {
    const response = await prisma.recipes.findMany({});
    res.json({ response });
  } catch (err) {
    res.json(err);
  }
});

// TO POST THE RECIPES...
router.post("/", async (req, res) => {
  const {
    userName,
    recipeName,
    description,
    ingredients,
    imgurl,
    cookingTime,
  } = req.body;

  const user = await prisma.recipeUser.findMany({ where: { userName } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const recipe = await prisma.recipes.create({
    data: {
      owner: userName,
      Name: recipeName,
      Description: description,
      ingredients: ingredients,
      imgurl: imgurl,
      cookingTime: cookingTime,
    },
  });
  res.json({ recipe });
});





router.put("/recipe", async (req: Request, res: Response) => {
  const { recipeId, username } : {recipeId: string,username:string} = req.body;

  if (!recipeId || !username) {
    return res.status(400).json({message:"recepieId and username required"});
  }

  const recipe = await prisma.recipes.findUnique({
    where: { id: recipeId },
  });

  const user = await prisma.recipeUser.findUnique({
    where: { userName: username },
  });

  if (!recipe) {
    return res.json({
      message: "not found",
    });
  }
  if (!user) {
    return res.json({
      message: "not found",
    });
  }

  if(!Array.isArray(user.savedRecipes)){
    user.savedRecipes = []
  }
  // WILL ONLY PUSH IF THE  RECEPEID  is not their
  if(!user.savedRecipes.includes(recipeId)){
    user.savedRecipes.push(recipeId);
  }
  

  // Update the user's record in the database
  await prisma.recipeUser.update({
    where: { userName: username },
    data: { savedRecipes: user.savedRecipes },
  });

  return res.status(200).json({message: "hello world"})
});

export default router;
