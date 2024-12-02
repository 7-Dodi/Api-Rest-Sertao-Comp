# API REST com Prisma ORM e TypeScript

Este repositório contém o código desenvolvido para o minicurso **Introdução ao Desenvolvimento de APIs** ministrado durante o evento **Sertão Comp**, da disciplina de Análise e Desenvolvimento de Sistemas (ADS). 

## Descrição do Projeto

O objetivo deste minicurso é ensinar conceitos básicos de desenvolvimento de APIs REST, com foco em:  
- Criação de uma tabela de "Usuário" utilizando **Prisma ORM**;  
- Implementação das operações de **CRUD** (Create, Read, Update e Delete);  
- Uso de **JWT** (JSON Web Token) para autenticação;  
- Upload de imagens para uma API.

Descrição do repositório:  
> Development of a Rest API with Prisma ORM and TypeScript for the presentation of the Introduction to API Development Minicourse.

---

## Tecnologias Utilizadas

- **Node.js**  
- **TypeScript**  
- **Prisma ORM**  
- **Express**  
- **JSON Web Token (JWT)**  
- **Multer** para upload de imagens  

---

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:  
- **Node.js** (versão >= 16.x);  
- **NPM** ou **Yarn**;  
- Um banco de dados compatível com o Prisma (por padrão, utilizamos o **SQLite** neste projeto).  

---

## Instalação e Execução

1. Clone este repositório:  
   ```bash
   git clone https://github.com/7-Dodi/Api-Rest-Sertao-Comp.git

2. Navegue até o diretório do projeto:  
   ```bash
   cd minicurso-api

3. Instale as dependências:  
   ```bash
   npm install

4. Configure o banco de dados no arquivo .env: Siga o exemplo em:
    ```bash
    .env

5. Execute as migrações do Prisma:
    ```bash
    npx prisma migrate dev

6. Inicie o servidor:
    ```bash
    npm run dev

---

### **Endpoints Principais**

#### Usuários
- **GET /user/**: Lista todos os usuários  
- **GET /user/:userId**: Obtém informações de um usuário pelo ID  
- **POST /user**: Criação de um novo usuário  
- **PATCH /user/edit**: Atualiza informações de um usuário  
- **PATCH /user/password**: Atualiza senha de um usuário
- **DELETE /user/remove**: Exclui um usuário  

#### Autenticação
- **POST /user/auth**: Autenticação de usuário e geração de token JWT  

#### Upload de Imagens
- **POST /user/upload**: Upload de imagem para um usuário específico  

---

### **Contribuidores**

#### 🧑‍💻 **Dodi**  
[![Perfil no GitHub](https://github.com/7-Dodi.png?size=100)](https://github.com/7-Dodi)  
[github.com/7-Dodi](https://github.com/7-Dodi)  

#### 🧑‍💻 **Antônio Lacerda**  
[![Perfil no GitHub](https://github.com/AntLacerda.png?size=100)](https://github.com/AntLacerda)  
[github.com/AntLacerda](https://github.com/AntLacerda)  

---

### **Licença**  

Este projeto é licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.  

---

### **Contato**  

Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato:  
- [Dodi](https://github.com/7-Dodi)  
- [Antônio Lacerda](https://github.com/AntLacerda)  

---

Divirta-se aprendendo e explorando APIs! 🎉
```bash
Esse modelo inclui todas as informações que você solicitou, bem como os links para os perfis do GitHub com fotos e descrições. Caso queira ajustar algo, é só avisar!


