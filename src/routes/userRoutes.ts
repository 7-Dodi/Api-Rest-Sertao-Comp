//Importações
import { Router } from "express";

//Controllers
import { listAllUsers, listUserDataByID, postCreateUser } from "../controllers/userController";

//Configurações
const userRoutes = Router();

//Definindo rotas
userRoutes.get("/", listAllUsers);
userRoutes.post("/", postCreateUser);
userRoutes.get("/:userId", listUserDataByID);

//Exportando
export { userRoutes };