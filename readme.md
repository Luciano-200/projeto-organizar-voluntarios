# Sistema de Gerenciamento de Voluntários

Este projeto é uma API desenvolvida em Node.js com TypeScript, utilizando Express, Prisma ORM e PostgreSQL. O objetivo é ajudar organizadores no gerenciamento de voluntários e de tarefas. Voluntários podem se cadastrar e organizadores podem gerenciar tarefas e necessidades. 

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)

## Funcionalidades

- Cadastro e autenticação de contas (organizador e voluntário)
- Atribuição de tarefas a voluntários
- Registro de necessidades por categoria
- Controle de disponibilidade e especialidade dos voluntários
- Segurança com autenticação JWT e variáveis de ambiente

## Como Rodar o Projeto

Clone o repositório:
```bash
git clone https://github.com/Luciano-200/projeto-organizar-voluntarios.git
cd seu-projeto
npm install
npm start
```

##  Rode em modo de desenvolvimento

npm run dev

##  Compile o projeto para produção

npm run build

##  Configure o arquivo .env com sua conexão ao banco de dados

DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta

##  Execute as migrations

npm run dev

## Aprendizados

Durante o desenvolvimento deste projeto, aprendi sobre:
- Modelagem de dados com Prisma
- Autenticação segura com JWT
- Boas práticas de organização de código em projetos back-end
- Uso de Git e GitHub para versionamento
- Prática dos conhecimentos adquiridos ao longo do curso

## Observações

Este projeto está em fase de refinamento. Algumas migrations iniciais foram mantidas como parte do processo de aprendizado. O código está todo em inglês, mas o README está em português.

##  Autor

Luciano
Desenvolvedor em formação, focado em back-end com Node.js e TypeScript.