"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
//defining what type of vaue u want for the signup body
const signupBody = zod_1.default.object({
    userName: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    password: zod_1.default.string(),
});
//defining what type of vaue u want for the signup body
const loginbody = zod_1.default.object({
    userName: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "sab galat likha h",
        });
    }
    const existinguser = yield prisma.recipeUser.findFirst({
        where: { userName: req.body.userName },
    });
    if (existinguser) {
        return res.status(400).json({
            message: "u already have an account",
        });
    }
    const user = yield prisma.recipeUser.create({
        data: {
            userName: req.body.userName,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            savedRecipes: [],
        },
    });
    const token = jsonwebtoken_1.default.sign({
        username: user.userName
    }, "arise");
    return res.status(200).json({ token,
        message: "ho gya signup",
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = loginbody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "kuch bhi!",
        });
    }
    const existinguser = yield prisma.recipeUser.findFirst({
        where: { userName: req.body.userName, password: req.body.password },
    });
    if (!existinguser) {
        return res.status(200).json({ message: "not an user" });
    }
    const token = jsonwebtoken_1.default.sign({
        username: existinguser.userName
    }, "arise");
    res.json({ token, username: existinguser.userName, message: "aa gaya" });
}));
//TO KNOW ALL THE USERS
router.get("/allusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allusers = yield prisma.recipeUser.findMany({});
    res.json(allusers);
    res.status(200).json({ message: "sare users le" });
}));
//TO GET THE RECIPES OF THE USER
router.get("/recipes/:userName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params;
    const allRecipes = yield prisma.recipes.findMany({
        where: { owner: userName },
    });
    if (allRecipes.length === 0) {
        return res.status(404).json({ message: "No recipes found for this user" });
    }
    return res.json({ recipes: allRecipes });
}));
router.post("/saved-recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    try {
        // Find the user based on the username
        const user = yield prisma.recipeUser.findUnique({
            where: { userName: username },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const savedRecipes = user.savedRecipes;
        const allSavedRecipes = [];
        // Iterate through the saved recipe IDs and fetch each recipe
        for (const recipeId of savedRecipes) {
            const recipe = yield prisma.recipes.findUnique({
                where: { id: recipeId },
            });
            if (recipe) {
                allSavedRecipes.push(recipe);
            }
        }
        return res.status(200).json({
            savedRecipes: allSavedRecipes,
        });
    }
    catch (error) {
        console.error("Error fetching saved recipes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
