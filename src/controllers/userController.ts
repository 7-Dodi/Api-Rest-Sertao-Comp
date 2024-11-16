//Importações
import { Request, Response } from "express";
import { validate } from "uuid";
import { ZodError } from "zod";

//Services
import { createUser, findAllUsers, findUserDataByID } from "../services/userService";

//Types
import { createUserDTO } from "../types/userTypes";

//Validators
import { createUserSchema } from "../validators/userValidators";

//Utils
import { handleZodError } from "../utils/errorHandle";

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

//Requisição para listar usuário por ID
export const listUserDataByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscar dados na requisição
        const userId = req.params.userId;

        //Verificar se o id é válido
        if (!userId || userId === null || userId === undefined) return res.status(400).json({error: "User ID not informed"});        
        if (!validate(userId)) return res.status(400).json({error: "Invalid ID format"});

        //Busca dados no service
        const userData = await findUserDataByID(userId);
        if(!userData) return res.status(404).json({message: "User not found"});

        //Retornando dado final
        return res.status(200).json({message: "User found, listing data", data: userData});
    } catch (error) {
        console.error("Error in return data of user by ID: ", error);
        return res.status(500).json({error: "Error in return data of user by ID"});
    };
};

//Requisição para criar um usuário
export const postCreateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Recebendo dados da requisição
        const userData: createUserDTO = createUserSchema.parse(req.body);

        //Enviando dado para o services
        const createdUser = await createUser(userData);
        if (!createdUser.success) return res.status(400).json({message: createdUser.message});

        //Retornando respostas
        return res.status(201).json({message: createdUser.message, data: createdUser.data});

    } catch (error) {
        // Verificar se o erro é de validação do Zod
        if (error instanceof ZodError) return handleZodError(error, res);

        console.error("Error in create user: ", error);
        return res.status(500).json({error: "Error in create user"});
    };
};