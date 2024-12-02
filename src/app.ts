//Importações
import express from "express";
import cors from "cors";
import path from "path";

//Rutes
import { routes } from "./routes/router";

//Configurações
const app = express();
app.use(express.json());
app.use(cors());

//Definindo rotas
app.use(routes);

//Configurando rota para upload de arquivo
app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

//Exportando
export { app };