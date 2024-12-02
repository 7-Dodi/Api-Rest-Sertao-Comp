//Importações
import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";

//Services
import { findUserDataByID } from "../services/userService";

//Definindo o middleware
export async function checkingUserExists(req:Request, res: Response, next: NextFunction) {
    //Pegando o id do usuário
    const userId = req.id_User;
    
    try {
        //Verificando se o atributo foi passado
        if (!userId || userId === null || userId === undefined) return res.status(401).json({ message: "ID of user not informed" });

        //Verificando se o atributo é um ID válido
        if (!validate(userId)) return res.status(400).json({ message: "Invalid format ID" });

        //Verificando se o usuário existe
        const userExistWithID = await findUserDataByID(userId);
        if (!userExistWithID) return res.status(404).json({ message: "User not found" });

        // Usuário encontrado, seguindo para a próxima função
        next();

    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ message: "Internal server error" });
    };
};