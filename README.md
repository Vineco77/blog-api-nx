# API Blog - Desafio Técnico

API RESTful para gerenciar posts e comentários com autenticação JWT, utilizando PostgreSQL para posts/comentários e MongoDB para autenticação de usuários.

## Tecnologias Utilizadas

- Node.js v16 ou superior
- Express.js
- PostgreSQL (Posts e Comentários)
- MongoDB (Autenticação de Usuários)
- JWT (JSON Web Token)
- Docker e Docker Compose
- Jest e Supertest para testes

## Requisitos

- Docker e Docker Compose instalados
- Node.js v16 ou superior
- NPM ou Yarn
- PostgreSQL
- MongoDB

## Instalação e Execução

### Com Docker

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`

4. Execute com Docker Compose:

```bash
docker-compose up -d
```

### Sem Docker (Desenvolvimento local)

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`

3. Inicie a aplicação:

```bash
npm run dev
```

## Endpoints da API

### Autenticação

#### Registro de Usuário

```
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Nome do Usuário",
  "username": "usuario",
  "password": "senha123"
}
```

#### Login

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "senha123"
}
```

### Posts

#### Criar Post

```
POST /api/v1/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título do Post",
  "content": "Conteúdo do post"
}
```

#### Listar Posts

```
GET /api/v1/posts
Authorization: Bearer <token>
```

#### Buscar Post por ID

```
GET /api/v1/posts/:id
Authorization: Bearer <token>
```

#### Atualizar Post

```
PUT /api/v1/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado"
}
```

#### Deletar Post

```
DELETE /api/v1/posts/:id
Authorization: Bearer <token>
```

### Comentários

#### Adicionar Comentário

```
POST /api/v1/posts/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Conteúdo do comentário"
}
```

#### Listar Comentários de um Post

```
GET /api/v1/posts/:postId/comments
Authorization: Bearer <token>
```

#### Deletar Comentário

```
DELETE /api/v1/comments/:id
Authorization: Bearer <token>
```

## Executando os Testes

```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## Estrutura do Banco de Dados

### PostgreSQL

#### Tabela: posts

- id (PK)
- title
- content
- userId (FK para MongoDB)
- createdAt
- updatedAt

#### Tabela: comments

- id (PK)
- content
- postId (FK para posts)
- userId (FK para MongoDB)
- createdAt
- updatedAt

### MongoDB

#### Coleção: users

- \_id (PK)
- name
- username (unique)
- password (hashed)
- createdAt
- updatedAt

## Scripts Disponíveis

- `npm start`: Inicia a aplicação em produção
- `npm run dev`: Inicia a aplicação em desenvolvimento com nodemon
- `npm test`: Executa todos os testes
- `npm run test:unit`: Executa apenas testes unitários
- `npm run test:integration`: Executa apenas testes de integração
- `npm run test:coverage`: Executa testes e gera relatório de cobertura
- `npm run lint`: Executa o linter
- `npm run migrate`: Executa as migrations do Sequelize
- `npm run migrate:undo`: Desfaz a última migration

## Padrões de Código

O projeto segue os padrões de código do ESLint com as seguintes características:

- Arquitetura em camadas (Controllers, Services, Models)
- Tratamento de erros centralizado
- Validações com express-validator
- Autenticação com JWT
- Testes unitários e de integração

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
