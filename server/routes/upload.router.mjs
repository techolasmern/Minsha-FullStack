import { Router } from "express";
import uploadController from "../controllers/upload.controller.mjs";
import { upload } from "../middlewares/multer.mjs";

const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), uploadController.uploadFile);

export default uploadRouter;