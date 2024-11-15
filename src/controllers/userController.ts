//Importações
import { Request, Response } from "express";

//Services
import { findAllUsers } from "../services/userService";

//Definindo as requisições

//Requisição para listar todos os usuário
export const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados no service
        const allUser = await findAllUsers();
        if (allUser.length <= 0) return res.status(200).json({message: "There are no users yet"});

        //Retornando dados
        return res.status(200).json({message: "Returning user data", data: allUser});

    } catch (error) {
        console.error("Error in return datas of users: ", error);
        return res.status(500).json({error: "Error in return datas of users"});
    };
};