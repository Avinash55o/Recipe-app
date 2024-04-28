import express from "express";

import cors from "cors";
import users from "./routes/user";
import recipe from "./routes/recipe";

const app = express();

app.use(express.json());
app.use(cors());
app.use(users);
app.use("/recipe", recipe);

app.listen(3000, () => console.log("connect ho gaya!"));
