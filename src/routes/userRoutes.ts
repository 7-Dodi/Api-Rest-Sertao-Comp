//Importações
import { Router } from "express";

//Controllers
import { listAllUsers } from "../controllers/userController";

//Configurações
const userRoutes = Router();

//Definindo rotas
userRoutes.get("/", listAllUsers);

//Exportando
export { userRoutes };