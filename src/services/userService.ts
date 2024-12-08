//Importações
import { prisma } from "../connections/prisma";

//Types
import { createUserDTO, updateUserDTO, updateUserPasswordDTO } from "../types/userTypes";

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

//Método para procurar um usuário com um determinado email, mas com id diferente
export const findUserByEmailButNotID = async (email: string, id: string) => {
    const data = await prisma.user.findFirst({
        where: {
            email,
            id: { not: id }
        }
    });

    return data;
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
        return { success: false, message: "Failed to create user" };
        // Ou: throw new Error("Failed to create user");
    };
};

//Método para editar as informações de um usuário
export const editDataUser = async (data: updateUserDTO, userId: string) => {
    try {
        //Validar que o usuário exista com o ID
        const userExistID = await findUserDataByID(userId);
        if (!userExistID) return { success: false, message: "There us already a user with this ID" };

        //Validando que não exista outro usuário com o mesmo e-mail informado
        const userAlreadyExistWithEmail = await findUserByEmailButNotID(data.email, userId);
        if (userAlreadyExistWithEmail) return { success: false, message: "Email already exists" }

        //Edita informações do usuário
        const editUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                email: data.email
            }
        });

        //Retorna resposta
        return { success: true, message: "User updated succesfully", data: editUser };
    } catch (error) {
        console.error("Error updating user: ", error);
        return { success: false, message: "Failed to update user" };
        // Ou: throw new Error("Failed to update user");
    };
};

//Método para editar a senha de um usuário
export const editPassword = async (data: updateUserPasswordDTO) => {
    try {
        //Validando que o usuário existe
        const userExistWithID = await findUserDataByEmail(data.email);
        if (!userExistWithID) return { success: false, message: "There us already a user with this ID" };

        //Editando a senha do usuário
        const editUser = await prisma.user.update({
            where: { email: data.email },
            data: {
                password: data.password
            },
        });

        //Retornando resposta
        return { success: true, message: "User updated succesfully", data: editUser };

    } catch (error) {
        console.error("Error updating user: ", error);
        return { success: false, message: "Failed to update user" };
        // Ou: throw new Error("Failed to update user");
    };
};

//Método para atualizar foto do perfil
export const updateProfileImage = async (userId: string, fileName: string) => {
    try {
        //Validar que o usuário exista com o ID
        const userExistID = await findUserDataByID(userId);
        if (!userExistID) return { success: false, message: "There us already a user with this ID" };

        //Salvando a imagem de perfil
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                profileImage: fileName,
            }
        });

        return { success: true, message: "User updated profile image succesfully", data: user };

    } catch (error) {
        console.error("Error updating user: ", error);
        throw new Error("Failed to update user");
    }
}

//Método para remoção de um usuário
export const deleteUser = async (userId: string) => {
    try {
        //Validando que o usuário existe
        const existUserWithId = await findUserDataByID(userId);
        if (!existUserWithId) return { success: false, message: "There us already a user with this ID" };

        //Removendo usuário
        await prisma.user.delete({
            where: { id: userId }
        });

        //Retornando resposta
        return { success: true, message: "User removed succesfully" };
    } catch (error) {
        console.error("Error deleting user: ", error);
        return { success: false, message: "Failed to delete user" };
        // Ou: throw new Error("Failed to update user");
    };
};