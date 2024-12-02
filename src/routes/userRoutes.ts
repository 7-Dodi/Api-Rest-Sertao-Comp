//Importações
import { Router } from "express";
import multer from "multer";

//Controllers
import * as userController from "../controllers/userController";
import uploadConfigImage from '../config/multer';

//Middlewares
import { authValidationToken } from "../middlewares/authValidationToken";
import { checkingUserExists } from "../middlewares/checkingUserExists";
import { validationUploadImageUser } from "../middlewares/validationUploadImageUser";

//Configurações
const userRoutes = Router();
const upload = multer(uploadConfigImage);

//Definindo rotas
// =========== SEM AUTENTICAÇÃO ===========
userRoutes.get("/", userController.listAllUsers);
userRoutes.get("/:userId", userController.listUserDataByID);
userRoutes.post("/", userController.postCreateUser);
userRoutes.post("/auth", userController.postAuthUser);
userRoutes.patch("/password", userController.editPasswordUser);

// ========== COM AUTENTICAÇÃO ============
userRoutes.patch("/edit", authValidationToken, checkingUserExists, userController.editDataUser);
userRoutes.patch("/upload", authValidationToken, checkingUserExists, validationUploadImageUser, upload.single("image"), userController.applyImageUser);
userRoutes.delete("/remove", authValidationToken, checkingUserExists, userController.removeUser);

//Exportando
export { userRoutes };