# API Blog - Desafio Técnico

API RESTful para gerenciar posts e comentários com autenticação JWT.

## Tecnologias Utilizadas

- Node.js com Express
- PostgreSQL (Posts e Comentários)
- MongoDB (Autenticação de Usuários)
- JWT para autenticação
- Docker e Docker Compose

## Requisitos

- Docker
- Docker Compose

## Instalação e Execução com Docker

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

3. Inicie os containers com Docker Compose

```bash
docker-compose up -d
```

A aplicação estará disponível em `http://localhost:3000`

## Executando sem Docker (Desenvolvimento local)

1. Instale as dependências

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo .env

3. Inicie a aplicação

```bash
npm run dev
```

[resto do README mantido como estava...]
