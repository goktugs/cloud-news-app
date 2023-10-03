import express from "express";

import signupPostRoot from "../controllers/root/signupPost.controller";
import loginPostRoot from "../controllers/root/loginPost.controller";
import currentUserGet from "../controllers/root/currentUserGet.controller";
import validateTokenHandler from "../middleware/validateTokenHandler";
import changeUserPreferencesPut from "../controllers/root/changeUserPreferecencesPut.controller";
import refreshTokenPost from "../controllers/root/refreshTokenPost.controller";
import allNewsGet from "../controllers/root/allNewsGet.controller";
import requestedNews from "../controllers/root/requestedNewsPost.controller";
import getAllSources from "../controllers/root/allSourcesGet.controller";
import getAllHeadlines from "../controllers/root/getAllHeadlines.controller";
import getUserPreferences from "../controllers/root/getUserPreferences.controller";

const root = express.Router();

root.post("/api/v1/signup", signupPostRoot);
root.post("/api/v1/login", loginPostRoot);
root.get("/api/v1/getMe", validateTokenHandler, currentUserGet);
root.post("/api/v1/refreshToken", refreshTokenPost);
root.patch("/api/v1/changeUserPreferences/:userId", changeUserPreferencesPut);

root.get("/api/v1/userPreferences", validateTokenHandler, getUserPreferences);

root.get("/api/v1/getAllHeadlines", getAllHeadlines);
root.post("/api/v1/postRequestedNews", requestedNews);
root.get("/api/v1/getAllNews", allNewsGet);
root.get("/api/v1/getAllSources", getAllSources);

export default root;
