//Importações
import { Router } from "express";

//Importações de definições routes
import { userRoutes } from "./userRoutes";

//Configurações
const routes = Router();

//Define as rotas
routes.use("/user", userRoutes);

//Exportando
export { routes };