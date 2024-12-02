//Importações
import { Request, Response, NextFunction } from "express";
import { existsSync, unlinkSync } from "fs";
import path from "path";

//Services
import * as userService from "../services/userService";

//Função de verificação e atulização de senha
export async function validationUploadImageUser(req: Request, res: Response, next: NextFunction) {
    //Busca identificador do usuário
    const userId = req.id_User;

    try {
        const existUser = await userService.findUserDataByID(userId); //Verificando a veracidade do usuário

        if (existUser?.profileImage && existUser.profileImage !== 'Unregistered profile picture' && existUser.profileImage !== null) {
            //Caminho do arquivo de foto do usuário
            const oldImagePath = path.join(__dirname, ".." , "..", "/uploads", path.basename(existUser.profileImage));
            
            //Só remove se existir
            if (existsSync(oldImagePath)) {
                unlinkSync(oldImagePath); //Remove arquivo do diretório
            }
        }
        next();
        
    } catch (error) {
        console.error('Error checking user and deleting old image:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}