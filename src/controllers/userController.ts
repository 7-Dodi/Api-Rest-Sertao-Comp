//Importações
import { Request, Response } from "express";
import { validate } from "uuid";
import { ZodError } from "zod";

//Services
import * as userService from "../services/userService";

//Types
import * as userTypes from "../types/userTypes";

//Validators
import * as userValidators from "../validators/userValidators";

//Utils
import { handleZodError } from "../utils/errorHandle";
import * as hashPassword from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

//Definindo as requisições

//Requisição para listar todos os usuário
export const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados no service
        const allUser = await userService.findAllUsers();
        if (allUser.length <= 0) return res.status(200).json({ message: "There are no users yet" });

        //Retornando dados
        return res.status(200).json({ message: "Returning user data", data: allUser });

    } catch (error) {
        console.error("Error in return datas of users: ", error);
        return res.status(500).json({ error: "Error in return datas of users" });
    };
};

//Requisição para listar usuário por ID
export const listUserDataByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscar dados na requisição
        const userId = req.params.userId;

        //Verificar se o id é válido
        if (!userId || userId === null || userId === undefined) return res.status(400).json({ error: "User ID not informed" });
        if (!validate(userId)) return res.status(400).json({ error: "Invalid ID format" });

        //Busca dados no service
        const userData = await userService.findUserDataByID(userId);
        if (!userData) return res.status(404).json({ message: "User not found" });

        //Retornando dado final
        return res.status(200).json({ message: "User found, listing data", data: userData });
    } catch (error) {
        console.error("Error in return data of user by ID: ", error);
        return res.status(500).json({ error: "Error in return data of user by ID" });
    };
};

//Requisição para criar um usuário
export const postCreateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Recebendo dados da requisição
        const userData: userTypes.createUserDTO = userValidators.createUserSchema.parse(req.body);

        //Criptografando a senha
        const passwordHash = await hashPassword.hashPassword(userData.password);

        //Enviando dado para o services
        const createdUser = await userService.createUser({ ...userData, password: passwordHash });
        if (!createdUser.success) return res.status(400).json({ message: createdUser.message });

        //Retornando respostas
        return res.status(201).json({ message: createdUser.message, data: createdUser.data });

    } catch (error) {
        // Verificar se o erro é de validação do Zod
        if (error instanceof ZodError) return handleZodError(error, res);

        console.error("Error in create user: ", error);
        return res.status(500).json({ error: "Error in create user" });
    };
};

//Requisição para autenticar um usuário
export const postAuthUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados de login
        const data: userTypes.authenticaterUser = userValidators.authenticaterUserSchema.parse(req.body);

        //Validações:
        // Usuário existe com esse email
        const userExistWithEmail = await userService.findUserDataByEmail(data.email);
        if (!userExistWithEmail) return res.status(404).json({ message: "User does not exist with e-mail" });

        // Senha do usuário é igual a do banco
        const isPasswordCorrect = await hashPassword.checkePassword(data.password, userExistWithEmail.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        //Gerando token
        const tokenResult = generateToken(data.email, userExistWithEmail.id);
        if (!tokenResult.success) return res.status(500).json({ error: tokenResult.message });

        //Retornando resposta
        return res.status(200).json({ message: "User authenticated succesfully", token: tokenResult });

    } catch (error) {
        // Verificar se o erro é de validação do Zod
        if (error instanceof ZodError) return handleZodError(error, res);

        console.error("Error in create user: ", error);
        return res.status(500).json({ error: "Error in create user" });
    }
};

//Requisição para editar as informações de um usuário
export const editDataUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados
        const userId = req.id_User; //Buscando id do usuário 
        const data: userTypes.updateUserDTO = userValidators.updateUserDataSchema.parse(req.body); //Buscando dados

        //Chamando service
        const updateUser = await userService.editDataUser(data, userId);
        if (!updateUser.success) return res.status(400).json({ message: updateUser.message });

        //Retornando resposta
        return res.status(200).json({ message: updateUser.message });

    } catch (error) {
        // Verificar se o erro é de validação do Zod
        if (error instanceof ZodError) return handleZodError(error, res);

        console.error("Error in create user: ", error);
        return res.status(500).json({ error: "Error in create user" });
    }
};

//Requisição para editar a senha de um usuário
// (Pode-se deixar essa função para desafio: Mostra a edição de informações e deixa a edição de senha como desafio)
export const editPasswordUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados
        const data: userTypes.updateUserPasswordDTO = userValidators.updateUserPasswordSchema.parse(req.body); // Validando os dados

        //Criptografando a senha
        const passwordHash = await hashPassword.hashPassword(data.password);

        //Chamando a função de edição de senha
        const editPassword = await userService.editPassword({ ...data, password: passwordHash });
        if (!editPassword.success) return res.status(400).json({ message: editPassword.message });

        //Retornando resposta
        return res.status(200).json({ message: editPassword.message, data: editPassword.data })

    } catch (error) {
        // Verificar se o erro é de validação do Zod
        if (error instanceof ZodError) return handleZodError(error, res);
        
        console.error("Error in create user: ", error);
        return res.status(500).json({ error: "Error in create user" });
    }
};

//Requisição para adicionar imagem para um usuário
export const applyImageUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscar os atributos
        const userId = req.id_User;
        const requestImage = req.file as Express.Multer.File;

        //Validação para verificar se a imagem existe
        if (!requestImage) return res.status(404).json({message: "File not existed"});

        //Salvando arquivo
        const userUpdateImage = await userService.updateProfileImage(userId, `/images/${requestImage.filename}`);
        if (!userUpdateImage.success) return res.status(400).json({message: userUpdateImage.message});
        
        //Retornando resposta
        return res.status(200).json({message: userUpdateImage.message, data: userUpdateImage.data});

    } catch (error) {
        console.error("Error in create user: ", error);
        return res.status(500).json({error: "Error in create user"});
    }
};

//Requisição para remover um usuário
export const removeUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Buscando dados
        const userId = req.id_User;

        ///Chamando função para remoção
        const deleteUser = await userService.deleteUser(userId);
        if (!deleteUser.success) return res.status(400).json({ message: deleteUser.message });

        //Retornando resposta
        return res.status(200).json({ message: deleteUser.message });

    } catch (error) {
        console.error("Error in create user: ", error);
        return res.status(500).json({ error: "Error in create user" });
    }
};