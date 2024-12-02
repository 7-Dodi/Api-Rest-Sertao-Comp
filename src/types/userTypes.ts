//Definindo interface padrão para usuário
export interface UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    profileImage: string;
    createdAt: Date;
    updatedAt: Date;
};

//Criando tipo para a criação de um usuário
export type createUserDTO = Omit <UserDTO, "id" | "profileImage" | "createdAt" | "updatedAt">;

//Criando tipo para edição de um usuário
export type updateUserDTO = Omit<createUserDTO, 'password'>;

//Criando tipo para edição de senha de usuário
export type updateUserPasswordDTO = {
    email: string;
    password: string;
    confirmPassword: string;
};

//Criando um tipo para autenticação de usuário
export type authenticaterUser = {
    email: string;
    password: string;
};