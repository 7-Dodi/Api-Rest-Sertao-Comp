//Importações
import { prisma } from "../connections/prisma";

//Definindo os services

//Método para listar todos os usuários
export const findAllUsers = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
};