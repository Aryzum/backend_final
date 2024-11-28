# Gerenciador de Tarefas

Este projeto é um gerenciador de tarefas com um painel administrativo. Ele consiste em um backend Node.js e um frontend React.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- MongoDB

## Instalação

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/Aryzum/trabalho_final.git
cd trabalho_final
```

Após isso, dedique 2 terminais para o projeto, sendo cada um para cada pasta do trabalho final (backend e frontend)

## Configuração

Para conseguir conectar ao banco e front<->back, voce precisa configurar o seu backend, comece criando o arquivo .env e então cole o seguinte:

```
MONGODB_URI=mongodb+srv://root32:root32@cluster0.ag9l1.mongodb.net/
PORT=3333
SECRET_KEY="minhachavesecreta"
```

Já no caso do frontend, repita o mesmo processo de criação mas cole apenas:

```
VITE_API_URL=http://127.0.0.1:3333
```

## Execução

Após acessar as pastas frontend e backend, execute em ambas o comando ```npm install``` e ao finalizar ```npm run dev```

