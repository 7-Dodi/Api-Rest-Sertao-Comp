//Importações
import { prisma } from "../connections/prisma";

//Definindo os services

//Método para listar todos os usuários
export const findAllUsers = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
};

//Método para listar um usuáiro por ID
export const findUserDataByID = async (userId: string) => {
    const userData = await prisma.user.findUnique({
        where: {id: userId}
    });

    return userData;
};

//Método para listar um usuáiro por Email
export const findUserDataByEmil = async (userEmail: string) => {
    const userData = await prisma.user.findUnique({
        where: {email: userEmail}
    });

    return userData;
};