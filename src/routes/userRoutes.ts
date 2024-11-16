//Importações
import { Router } from "express";

//Controllers
import { listAllUsers, listUserDataByID } from "../controllers/userController";

//Configurações
const userRoutes = Router();

//Definindo rotas
userRoutes.get("/", listAllUsers);
userRoutes.get("/:userId", listUserDataByID);

//Exportando
export { userRoutes };