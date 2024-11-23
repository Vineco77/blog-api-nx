# API Blog - Desafio Técnico

API RESTful para gerenciar posts e comentários com autenticação JWT.

## Tecnologias Utilizadas

- Node.js com Express
- PostgreSQL (Posts e Comentários)
- MongoDB (Autenticação de Usuários)
- JWT para autenticação
- Docker e Docker Compose

## Configuração do Ambiente

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie os containers Docker

```bash
docker-compose up -d
```

5. Inicie a aplicação

```bash
npm run dev
```

## Rotas da API

### Autenticação

#### Registro de Usuário

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste",
    "username": "usuario",
    "password": "senha123"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario",
    "password": "senha123"
  }'
```

### Posts

#### Criar Post

```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Conteúdo do post"
  }'
```

#### Listar Posts

```bash
curl -X GET http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer <seu-token>"
```

#### Buscar Post por ID

```bash
curl -X GET http://localhost:3000/api/v1/posts/:id \
  -H "Authorization: Bearer <seu-token>"
```

#### Atualizar Post

```bash
curl -X PUT http://localhost:3000/api/v1/posts/:id \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado",
    "content": "Conteúdo atualizado"
  }'
```

#### Deletar Post

```bash
curl -X DELETE http://localhost:3000/api/v1/posts/:id \
  -H "Authorization: Bearer <seu-token>"
```

### Comentários

#### Adicionar Comentário

```bash
curl -X POST http://localhost:3000/api/v1/posts/:postId/comments \
  -H "Authorization: Bearer <seu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Meu comentário"
  }'
```

#### Listar Comentários de um Post

```bash
curl -X GET http://localhost:3000/api/v1/posts/:postId/comments \
  -H "Authorization: Bearer <seu-token>"
```

#### Deletar Comentário

```bash
curl -X DELETE http://localhost:3000/api/v1/comments/:id \
  -H "Authorization: Bearer <seu-token>"
```

## Estrutura do Banco de Dados

### PostgreSQL

- Tabela `posts`

  - id (PK)
  - title
  - content
  - userId (FK para MongoDB)
  - createdAt
  - updatedAt

- Tabela `comments`
  - id (PK)
  - content
  - postId (FK para posts)
  - userId (FK para MongoDB)
  - createdAt
  - updatedAt

### MongoDB

- Coleção `users`
  - \_id (PK)
  - name
  - username (unique)
  - password (hashed)
  - createdAt
  - updatedAt

## Desenvolvimento

Para rodar em modo desenvolvimento:

```bash
npm run dev
```

## Produção

Para build de produção:

```bash
npm run build
npm start
```
