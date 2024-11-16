//Definindo interface padrão para usuário
export interface UserDTO {
    id?: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
};