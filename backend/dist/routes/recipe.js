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
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//to show all the recipe
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.recipes.findMany({});
        res.json({ response });
    }
    catch (err) {
        res.json(err);
    }
}));
// TO POST THE RECIPES...
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, recipeName, description, ingredients, imgurl, cookingTime, } = req.body;
    const user = yield prisma.recipeUser.findMany({ where: { userName } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const recipe = yield prisma.recipes.create({
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
}));
router.put("/recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId, username } = req.body;
    if (!recipeId || !username) {
        return;
    }
    const recipe = yield prisma.recipes.findUnique({
        where: { id: recipeId },
    });
    const user = yield prisma.recipeUser.findUnique({
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
    if (!Array.isArray(user.savedRecipes)) {
        user.savedRecipes = [];
    }
    // WILL ONLY PUSH IF THE  RECEPEID  is not their
    if (!user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.push(recipeId);
    }
    // Update the user's record in the database
    yield prisma.recipeUser.update({
        where: { userName: username },
        data: { savedRecipes: user.savedRecipes },
    });
    return res.status(200).json({ message: "hello world" });
}));
exports.default = router;
