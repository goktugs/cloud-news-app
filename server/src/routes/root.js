import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import signupPostRoot from "../controllers/root/signUpPost.controller";
import loginPostRoot from "../controllers/root/loginPost.controller";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.post("/api/v1/signup", signupPostRoot);
root.post("/api/v1/login", loginPostRoot);

export default root;
