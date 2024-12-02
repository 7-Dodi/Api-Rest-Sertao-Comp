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

//Validaçõa para edição da senha de um usuário
export const updateUserPasswordSchema = z.object({
    email: z.string()
        .email({ message: 'Please enter a valid email address' }),

    password: z.string()
        .min(5, { message: 'Password must be at least 5 characters long' }),

    confirmPassword: z.string()
        .min(5, { message: 'Password must be at least 6 characters long' })
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
});

//Validaçõa para edição da senha de um usuário
export const authenticaterUserSchema = z.object({
    email: z.string()
        .email({ message: 'Please enter a valid email address' }),

    password: z.string()
        .min(5, { message: 'Password must be at least 5 characters long' }),
});