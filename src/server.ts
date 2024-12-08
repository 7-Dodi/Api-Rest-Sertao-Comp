//Importando o App
import { app } from "./app";

//Importar a porta da API
const port = process.env.API_PORT || 5000;

//Inicializando
app.listen(port, () => {
    console.log(`Server is running in port: ${port}`);
});