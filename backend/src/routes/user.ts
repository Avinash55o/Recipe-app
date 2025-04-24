import express, { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const router = express.Router();

//defining what type of vaue u want for the signup body
const signupBody = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

//defining what type of vaue u want for the signup body

const loginbody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "input valuse are wrong",
    });
  }

  const existinguser = await prisma.recipeUser.findFirst({
    where: { userName: req.body.userName },
  });

  if (existinguser) {
    return res.status(400).json({
      message: "user is already exist",
    });
  }

  const user = await prisma.recipeUser.create({
    data: {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      savedRecipes: [],
    },
  });

  const token = jwt.sign(
    {
      username: user.userName
    },
    "arise"
  );

  return res.status(200).json({token,
    message: "the user is signedup",
  });
});

router.post("/login", async (req:Request, res:Response) => {
  const { success } = loginbody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "input values is wrong",
    });
  }

  const existinguser = await prisma.recipeUser.findFirst({
    where: { userName: req.body.userName, password: req.body.password },
  });
  if (!existinguser) {
    return res.status(200).json({ message: "user is unknown" });
  }

  const token = jwt.sign(
    {
      username: existinguser.userName
    },
    "arise"
  );

  res.json({ token, username: existinguser.userName, message: "user is loggedin" });
});

//TO KNOW ALL THE USERS
router.get("/allusers", async (req: any, res: any) => {
  try {
    const allusers = await prisma.recipeUser.findMany({});
    res.json(allusers);
  
    res.status(200).json({ message: "all recipeUser" });
  } catch (error) {
    throw res.status(400).json({message:"there is an error in showing all the user",error:error})
  }
 
});

//TO GET THE RECIPES OF THE USER
router.get("/recipes/:userName", async (req: Request, res: Response) => {
  const { userName } = req.params;

  const allRecipes = await prisma.recipes.findMany({
    where: { owner: userName },
  });

  if (allRecipes.length === 0) {
    return res.status(404).json({ message: "No recipes found for this user" });
  }

  return res.json({ recipes: allRecipes });
});


router.post("/saved-recipe", async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Find the user based on the username
    const user = await prisma.recipeUser.findUnique({
      where: { userName:username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedRecipes = user.savedRecipes;

    const allSavedRecipes: any[] = [];

    // Iterate through the saved recipe IDs and fetch each recipe
    for (const recipeId of savedRecipes) {
      const recipe = await prisma.recipes.findUnique({
        where: { id: recipeId },
      });

      if (recipe) {
        allSavedRecipes.push(recipe);
      }
    }

    return res.status(200).json({
      savedRecipes: allSavedRecipes,
    });
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
