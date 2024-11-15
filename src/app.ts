//Importações
import express from "express";
import cors from "cors";
import { routes } from "./routes/router";

//Configurações
const app = express();
app.use(express.json());
app.use(cors());

//Definindo rotas
app.use(routes);

//Exportando
export { app };