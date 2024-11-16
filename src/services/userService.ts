//Importações
import { prisma } from "../connections/prisma";

//Types
import { createUserDTO } from "../types/userTypes";

//Definindo os services

//Método para listar todos os usuários
export const findAllUsers = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
};

//Método para listar um usuário por ID
export const findUserDataByID = async (userId: string) => {
    const userData = await prisma.user.findUnique({
        where: { id: userId }
    });

    return userData;
};

//Método para listar um usuário por Email
export const findUserDataByEmail = async (userEmail: string) => {
    const userData = await prisma.user.findUnique({
        where: { email: userEmail }
    });

    return userData;
};

//Método para criar um usuário
export const createUser = async (data: createUserDTO) => {
    try {
        // Verifica se já existe um usuário com o email informado
        const userExistWithEmail = await findUserDataByEmail(data.email);
        if (userExistWithEmail) return { success: false, message: "There is already a user with this email" };

        //Cria a entidade
        const createdUser = await prisma.user.create({
            data: { ...data }
        });

        //Retorna resposta
        return { success: true, message: "User created successfully", data: createdUser };
    } catch (error) {
        console.error("Error creating user: ", error);
        return {success: false, message: "Failed to create user"};
        // Ou: throw new Error("Failed to create user");
    };
};