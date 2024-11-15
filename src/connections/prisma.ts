//Importações
import { PrismaClient } from "@prisma/client";

//Definindo o prisma cliente
const prisma = new PrismaClient();

export { prisma };