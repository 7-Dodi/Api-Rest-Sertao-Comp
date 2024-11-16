//Importações
import { z, ZodError } from "zod";

//Validação para criação de um usuário
export const createUserSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),

    email: z.string()
        .email({ message: 'Please enter a valid email address' }),

    password: z.string()
        .min(5, { message: 'Password must be at least 5 characters long' }),
});

//Validaçõa para edição das informações de um usuário
export const updateUserDataSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),

    email: z.string()
        .email({ message: 'Please enter a valid email address' }),
});