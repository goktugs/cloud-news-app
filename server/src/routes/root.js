import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import signupPostRoot from "../controllers/root/signupPost.controller";
import loginPostRoot from "../controllers/root/loginPost.controller";
import currentUserGet from "../controllers/root/currentUserGet.controller.controller";
import validateTokenHandler from "../middleware/validateTokenHandler";
import changeUserPreferencesPut from "../controllers/root/changeUserPreferecencesPut.controller";
import refreshTokenPost from "../controllers/root/refreshTokenPost.controller";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.post("/api/v1/signup", signupPostRoot);
root.post("/api/v1/login", loginPostRoot);
root.get("/api/v1/me", validateTokenHandler, currentUserGet);
root.post("/api/v1/refreshToken", refreshTokenPost);
root.put(
  "/api/v1/changeUserPreferences",
  validateTokenHandler,
  changeUserPreferencesPut
);

export default root;
